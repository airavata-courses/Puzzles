pipeline {
    agent any
    
    options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    stages {
        stage('Cleanup') {
            steps {
                // Clean before build
                cleanWs()
            }
        }
        stage('Checkout') {
            steps {
                echo "Checking out 'p1-profile' branch"
                git branch: 'p1-radar',
                url: 'https://github.com/airavata-courses/Puzzles.git',
                credentialsId: 'MyGitHub'
            }
        }
        stage('Build') {
            steps {
                /* Installing application dependencies */
                echo "Building ${env.JOB_NAME}..."
                sh "pip install virtualenv"
                sh "py -m virtualenv env"
                sh "./env/Scripts/activate"
                sh 'pip install numpy'
                sh 'pip install -r requirements.txt'
            }
        }
        stage('Test') {
            steps {
                /* Testing the application */
                echo 'Application Testing'
            }
        }
    }
}
