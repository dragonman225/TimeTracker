# Time Tracker

##### *A minimal time tracking and usage visualizing app.*

### Available Features

* Log activities and how long they take.

### Planned Features

* Export history to JSON
* Edit History
* Graphical Statistics
* Recommend Activity by Frequency and Current Time
* Support Storing History in Browser

### Develop for Android

##### Requirements

* Cordova

  ```bash
  $ npm install -g cordova
  ```

* Android SDK, JDK, Gradle

  Follow [Official Guide #Installing the Requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements)

##### Debug on real device

1. `git clone https://github.com/dragonman225/TimeTracker.git`
2. `cd TimeTracker`
3. `cordova platform add android`
4. Connect an Android phone with USB Debugging enabled to the computer.
5. `cordova run android`
6. Open `Chrome > Developer Tools > More Tools > Remote Devices`, choose your device to inspect.

##### Build Notes

* Fix error

  ```
  A problem occurred configuring project ':CordovaLib'.
  > Could not resolve all files for configuration ':CordovaLib:classpath'.
     > Could not find intellij-core.jar (com.android.tools.external.com-intellij:intellij-core:26.0.1).
  ```

  Open `platforms/android/CordovaLib/build.gradle`

  Change from this:

  ```
  repositories {
      jcenter()
      maven {
          url "https://maven.google.com"
      }
  }
  ```
    to this:
  ```
  repositories {
      maven {
          url "https://maven.google.com"
      }
      jcenter()
  }
  ```

### Develop for iOS

> *I haven't tried building for iOS.*

##### Requirements

* Cordova
* Xcode

### Develop for Browser

> *Currently browser support is broken, one needs to remove lines related to database operation to make it work.*

1. Clone the project.
2. Open `www/index.html` in browser

### Release

> __This app is under heavy development and not ready for daily use.__

* Android: [Release Page](https://github.com/dragonman225/TimeTracker/releases/)
