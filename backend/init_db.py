from app import app, db

with app.app_context():
    db.create_all()  # Create the database tables
    print("Database initialized and tables created.")
