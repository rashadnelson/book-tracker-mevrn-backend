pipeline {

    agent any

    stages {

        stage("build") {

            steps {
                sh 'npm install'
                sh 'docker-compose up'
            }
        }
    }
}