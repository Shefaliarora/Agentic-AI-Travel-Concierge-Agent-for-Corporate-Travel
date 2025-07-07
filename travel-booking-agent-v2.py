import json

def lambda_handler(event, context):
    booking_data = {
        "traveler": "Jane Doe",
        "flight": {
            "airline": "IndiGo",
            "flight_number": "6E302",
            "departure": "2025-07-12T09:00:00",
            "arrival": "2025-07-12T11:30:00",
            "price": 8500
        },
        "hotel": {
            "name": "Taj Palace, Delhi",
            "checkin": "2025-07-12",
            "checkout": "2025-07-15",
            "price_per_night": 3000,
            "total_cost": 9000
        }
    }

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body": json.dumps({
            "message": "Booking successful!",
            "booking": booking_data
        })
    }
