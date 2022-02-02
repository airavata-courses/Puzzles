pipeline {
    agent any
    
    options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
        
        // Test
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
//                 // We need to explicitly checkout from SCM here
//                 checkout scm
                echo "Building ${env.JOB_NAME}..."
                git branch: 'p1-gateway',
                url: 'https://github.com/airavata-courses/Puzzles.git',
                credentialsId: 'MyGitHub'
            }
        }
        stage('Build') {
            steps {
                /* Installing application dependencies */
                echo 'Building System'
                dir('p1-gateway-service') {
                    sh "pwd"
                    sh 'npm install'
                }               
                
            }
        }
        stage('Test') {
            steps {
                /* Testing the application */
                echo 'Application Testing'
                dir('p1-gateway-service') {
                    sh "pwd"
                    sh 'npm test'
                }               
            }
        }
    }
}
