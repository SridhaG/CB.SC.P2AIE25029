# Stage 1

For the Priority Inbox, we need to always display the top 'n' notifications based on importance (Placement > Result > Event) and then recency.

### Priority Logic
First, we assign a numerical weight to the types:
- Placement: 3
- Result: 2
- Event: 1

When a notification comes in, its overall priority is mostly dictated by this weight, but if two notifications have the same type, the newer one wins out.

### Keeping Top 10 Efficiently
If we just kept all notifications in an array and sorted it every time a new one arrived, it would get very slow as the list grew. 

To maintain the top 10 efficiently as new notifications stream in, we can use a Min-Heap (priority queue) that is limited to size 10.
- When a notification arrives, we check if the heap has fewer than 10 items. If so, we just add it.
- If the heap already has 10 items, we check the lowest priority item in our top 10 (which is always at the root of the Min-Heap). 
- If the new notification is more important/recent than that lowest item, we remove the root and insert the new notification.
- This ensures inserting a new notification is super fast (O(log 10), which is basically constant time) and we never waste memory storing or sorting irrelevant old notifications.
