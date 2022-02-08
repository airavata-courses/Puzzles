# Radar Service for Project 1

- The service fetches data from Nexrad data source (AWS S3) and generates a reflectivity graph which is then stored in the database using User History service

# Prerequisites
- Python 3.3 and newer
- PIP

# Installation steps - 
**Install virtual enviroment package**
```
python -m pip install --user virtualenv
```

**Create environment**
```
py -m venv env
```

**Activate environment**
```
.\env\Scripts\activate
```

**Check if inside the venv**
```
where python
```

**Install packages**
- Instal Numpy first (Required to install Py-ART)
```
pip install numpy
```

```
pip install -r requirements.txt
```

