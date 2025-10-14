pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reaactelectronics" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reaactelectronics"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reaactelectronics"
                xcopy /E /I /Y Frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reaactelectronics"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('Backend') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\practice.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\practice.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\practice" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\practice"
                )
                copy "Backend\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}