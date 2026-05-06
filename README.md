# Notification Dashboard

A simple full-stack notification dashboard for the evaluation project.

## Project Structure

- **`stage1_priority_inbox.py`**: A simple Python implementation using an efficient Min-Heap to calculate the top 10 priority notifications based on weight and recency.
- **`notification_app_fe/`**: The frontend React application built with Material UI to fetch, display, filter, and prioritize notifications.
- **`logging_middleware/`**: A custom logging package that intercepts routes and sends analytics to the evaluation logging endpoint.
- **`Notification_System_Design.md`**: Design document explaining the Priority Inbox Min-Heap logic.

## How to Run the React App (Stage 2)

1. Open a terminal and navigate into the frontend folder:
   ```bash
   cd notification_app_fe
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. View the dashboard at `http://localhost:3000`.

## How to Run the Python Script (Stage 1)
```bash
python stage1_priority_inbox.py
```