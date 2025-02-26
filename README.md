# Focus Timer Application

A customizable timer interface to help users maintain concentration during work sessions.
## Features
   ✔ Customizable time settings (adjust both minutes & seconds).
   ✔ Start, Pause, Resume, and Reset buttons for full control.
   ✔ Browser notification when the timer reaches 00:00.
   ✔ Light & Dark Mode toggle in settings (saves your preference in local storage).
   ✔ Error handling for invalid inputs (e.g., prevents setting 00:00).

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Jenni4B/myTimer.git
   cd myTimer
   
2. Install basic dependencies
   ```sh
   npm install

3. Run :D
   ```sh
   npm run dev

## How to Use
1. Start a Session by clicking the "Start" button
   You can pick a custom session, adjusting the minutes AND seconds

2. Click the "Start" button

3. The timer will begin counting down from 25:00 or whatever custom time you chose

4. Click "Pause" to temporarily stop the timer.
   Click "Resume" to continue from where you left off.

5. The Reset button is disabled while the timer is running. 
   If the timer is paused, the Reset button becomes available. Timer resets to the default value or the custom value

## Upcoming Features
1. Sound notifications when the timer reaches 00:00.
2. Session tracking (count how many focus sessions completed).

## Updates

### Update 2/25/2025
1. The Start Button becomes a resume and pause button depending on the state of the timer.
2. The reset button is unavaliable when the timer is counting down but can be pressed when the timer is paused.