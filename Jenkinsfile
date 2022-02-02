pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'p1-gateway',
                url: 'https://github.com/airavata-courses/Puzzles.git',
                credentialsId: 'MyGitHub'
            }
        }
        stage('Build') {
            steps {
                /* Installing application dependencies */
                echo 'Building System'
                cd "p1-gateway-service"
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                /* Testing the application */
                echo 'Application Testing'
                sh 'npm test'
            }
        }
    }
}
