pipeline {
    agent any
    stages {
        stage("Code"){
            steps{
                git url: "https://github.com/ShaileshS237/la2.0backend.git", branch: "master"
                echo 'Code is clonning Done.'
            }
        }
        stage("Build"){
            steps{
                sh "docker-compose down --rmi all"
                sh "docker build -t loveakot-image:latest ."
                echo 'Code build is Done.'
            }
        }
        stage("Deploy"){
            steps{
                sh "docker-compose up -d"
                echo 'Successfully Deployed'
            }
        }
        stage('Print Git Commit') {
            steps {
                script {
                    def gitCommit = sh(script: "git log -1 HEAD --oneline", returnStdout: true).trim()
                    echo "The Git commit which triggered this Job ===> ${gitCommit}"
                }
            }
        }
    }
}
