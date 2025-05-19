pipeline {
    agent any // Or specify a specific agent/node

    // Optional: Trigger the pipeline periodically or via webhook
    // For webhook, you'd configure it in your Git provider (GitHub, GitLab, etc.)
    // and in Jenkins (e.g., using the Generic Webhook Trigger plugin or SCM-specific plugins)
    triggers {
        pollSCM('H/5 * * * *') // Poll every 5 minutes, adjust as needed
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm // Checks out the code from the SCM configured in the Jenkins job
            }
        }

        stage('Determine Changes') {
            steps {
                script {
                    // Get the list of changed files
                    // This command gets changes between the current commit and the previous one.
                    // For pull requests, you might use 'git diff --name-only origin/${env.CHANGE_BRANCH} ${env.CHANGE_TARGET}'
                    // or specific Jenkins plugin environment variables.
                    def changedFiles = sh(script: "git diff --name-only HEAD^ HEAD", returnStdout: true).trim().split('\n')
                    echo "Changed files: ${changedFiles}"

                    // Set flags based on changed paths
                    env.BUILD_FRONTEND = false
                    env.BUILD_BACKEND = false

                    for (String file : changedFiles) {
                        if (file.startsWith('spaceforces-front/')) {
                            env.BUILD_FRONTEND = true
                        }
                        if (file.startsWith('spaceforces-back/')) {
                            env.BUILD_BACKEND = true
                        }
                    }

                    // If no relevant files changed, you might want to skip subsequent stages
                    if (!env.BUILD_FRONTEND && !env.BUILD_BACKEND) {
                        echo "No changes in frontend or backend. Skipping builds."
                        // currentBuild.result = 'NOT_BUILT' // Or 'ABORTED' if you prefer
                        // return // Exit the script block or stage
                    } else {
                        echo "Frontend build needed: ${env.BUILD_FRONTEND}"
                        echo "Backend build needed: ${env.BUILD_BACKEND}"
                    }
                }
            }
        }

        stage('Build Frontend') {
            when {
                expression { env.BUILD_FRONTEND == 'true' }
            }
            steps {
                echo "Building Frontend..."
                // Example frontend build commands (adjust to your actual commands)
                dir('spaceforces-front') {
                    // sh 'npm install' // Or yarn install
                    // sh 'npm run build' // Or your build script
                }
                // Archive artifacts, deploy, etc.
            }
        }

        stage('Build Backend') {
            when {
                expression { env.BUILD_BACKEND == 'true' }
            }
            steps {
                echo "Building Backend..."
                // Example backend build commands (adjust to your actual commands)
                dir('spaceforces-back') {
                    // sh './mvnw clean install' // Or gradle build, etc.
                    // sh './mvnw package'
                }
                // Archive artifacts, deploy, etc.
            }
        }

        // Optional: Stage for common tasks if either frontend or backend was built
        stage('Post Build Actions') {
            when {
                anyOf {
                    expression { env.BUILD_FRONTEND == 'true' }
                    expression { env.BUILD_BACKEND == 'true' }
                }
            }
            steps {
                echo "Performing post-build actions..."
                // e.g., notifications, cleanup
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
            // Clean up workspace if needed
            // cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
            // Send success notifications
        }
        failure {
            echo 'Pipeline failed!'
            // Send failure notifications
        }
        // notBuilt { // If you used currentBuild.result = 'NOT_BUILT'
        //    echo 'Pipeline was not built as no relevant changes were found.'
        // }
    }
}