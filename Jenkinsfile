pipeline {
    agent any

    stages {
        stage('CleanArchive') {
            steps {
                sh 'rm -rf *.tar.gz'
                echo 'done cleaning'
            }
        }
        stage('CleanTargetFolder') {
            steps {
                sh 'rm -rf /var/www/html/scalio/node_modules /var/www/html/scalio/src /var/www/html/scalio/public /var/www/html/scalio/package.json /var/www/html/scalio/build'
                echo 'done cleaning'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                echo 'done building'
            }
        }

          stage('Compress') {
            steps {
                sh 'tar czf node_with_jenkins-$BUILD_NUMBER.tar.gz node_modules src public package.json build'
                echo 'done compressing'
            }
        }
        stage('Extract') {
            steps {
                sh 'tar -xf node_with_jenkins-$BUILD_NUMBER.tar.gz --directory /var/www/html/scalio/'
                echo 'done extracting'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}