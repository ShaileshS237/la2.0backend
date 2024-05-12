pipeline {
    agent { label "main-server"}

    stages {

        stage("code"){
            steps{
                git url: "https://github.com/ShaileshS237/la2.0backend.git", branch: "master"
                echo 'Code is clonning Done.'
            }
        }
        stage("build"){
            steps{
                sh "docker-compose dowm --rmi all"
                sh "docker build -t loveakot-image:latest ."
                echo 'Code build is Done.'
            }
        }
        stage("deploy"){
            steps{
                sh "docker-compose up -d"
                echo 'Successfully Deployed'
            }
        }
    }
}
