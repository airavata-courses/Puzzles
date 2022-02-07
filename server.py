from flask import Flask
import nexradaws
import tempfile
import pytz
import pyart
from datetime import datetime,timedelta
import os
import matplotlib
matplotlib.use('Agg')
import shutil
from flask import send_file
import matplotlib.pyplot as plt
from flask import Flask, request, render_template
app = Flask(__name__)
    
@app.route('/')
def nexrad():

    #year = int(request.args.get("year"))
    templocation = tempfile.mkdtemp()
    conn = nexradaws.NexradAwsInterface()


    a = datetime(2010, 5, 31, 21, 00, 9, 342380)
    #print("year =", a.year)
    #print("month =", a.month)

    #print("day =", a.day)
    #print("hour =", a.hour)
    #print("minute =", a.minute)
    #print("timestamp =", a.timestamp())


    availscans = conn.get_avail_scans(a.year, a.month, a.day, 'KTLX')
    #print("There are {} NEXRAD files available for the KTLX radar.\n".format(len(availscans)))
    #print(availscans[0:4])

    current_date_and_time = a
    #print(current_date_and_time)

    hours = 1

    futuredate = a - timedelta(hours=hours)
    #print(futuredate)


    eastern_timezone = pytz.timezone('US/Eastern')
    radar_id = 'KTLX'
    end = eastern_timezone.localize(datetime(a.year,a.month,a.day,a.hour,a.minute))
    start = eastern_timezone.localize (datetime(futuredate.year,futuredate.month,futuredate.day,futuredate.hour,futuredate.minute))
    scans = conn.get_avail_scans_in_range(start, end, radar_id)
    #print("There are {} scans available between {} and {}\n".format(len(scans), start, end))
    #print(scans[0:4])


    results = conn.download(scans[0:4], templocation)


        
    fig = plt.figure(figsize=(16,12))
    paths=os.listdir(templocation)
    #print(templocation)
    for i,scan in enumerate(results.iter_success(),start=0):
        ax = fig.add_subplot(2,2,i+1)
        paths_loc=os.path.join(templocation,paths[i])
        #print(paths_loc,i+1)
        image_name=scan.radar_id+"_"+scan.scan_time.strftime("%Y%m%d_%H")+".png"
        #if paths_loc in db:
         #   return image
        radar = pyart.io.read(paths_loc)
        display = pyart.graph.RadarDisplay(radar)
        display.set_limits((-150, 150), (-150, 150), ax=ax)
        display.plot('reflectivity',0,ax=ax,title="{} {}".format(scan.radar_id,scan.scan_time))
        
    image_loc=os.path.join(templocation,image_name)
    plt.savefig(image_loc)
    #print("Image",image_loc)
    
    return send_file(image_loc, mimetype='image/png')
