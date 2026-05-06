import heapq
from datetime import datetime

def get_top_10_notifications(notifications):
    weights = {'Placement': 3, 'Result': 2, 'Event': 1}
    min_heap = []
    
    for notif in notifications:
        weight = weights.get(notif['Type'], 0)
        time = datetime.strptime(notif['Timestamp'], "%Y-%m-%d %H:%M:%S")
        
        # Tuple format: (weight, time, ID, notification_data)
        node = (weight, time, notif['ID'], notif)
        
        if len(min_heap) < 10:
            heapq.heappush(min_heap, node)
        else:
            if node > min_heap[0]:
                heapq.heappushpop(min_heap, node)
                
    # Sort descending
    top_10 = sorted([item[3] for item in min_heap], 
                   key=lambda x: (weights.get(x['Type'], 0), datetime.strptime(x['Timestamp'], "%Y-%m-%d %H:%M:%S")), 
                   reverse=True)
    return top_10

if __name__ == "__main__":
    dummy_data = [
        {"ID": "1", "Type": "Event", "Message": "farewell", "Timestamp": "2026-04-22 17:51:06"},
        {"ID": "2", "Type": "Placement", "Message": "CSX hiring", "Timestamp": "2026-04-22 17:51:18"},
        {"ID": "3", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:51:30"}
    ]
    print(get_top_10_notifications(dummy_data))
