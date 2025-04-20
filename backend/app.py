from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Create Flask App
app = Flask(__name__)

# Configure DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db = SQLAlchemy(app)

# Enable CORS
CORS(app)

# Task Model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='pending')
    deadline = db.Column(db.DateTime, nullable=True)
    subtasks = db.relationship('Subtask', backref='task', lazy=True, cascade="all, delete")

    # Create a method to convert Task to dictionary
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'deadline': self.deadline.strftime('%Y-%m-%d') if self.deadline else None,
            'subtasks': [subtask.to_dict() for subtask in self.subtasks]
        }

# Subtask Model
class Subtask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)

    # Create a method to convert Subtask to dictionary
    def to_dict(self):
        return {'id': self.id, 'title': self.title}
    

# API Route: Home
@app.route('/')
def home():
    return "Welcome to the Task Management API!"

# API Route: Get All Tasks
@app.route('/tasks/<string:status>', methods=['GET'])
def get_tasks_by_status(status):
    valid_statuses = ["pending", "in-progress", "done"]
    if status not in valid_statuses:
        abort(400, description="Invalid status")

    # Fetch tasks based on status
    tasks = Task.query.filter_by(status=status).all()
    return jsonify([task.to_dict() for task in tasks])


# API Route: Create Task
@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    if not data or not data.get('title') or not data.get('status') or not data.get('description'):
        abort(400, description="Title, description, and status are required")

    valid_statuses = ["pending", "in-progress", "done"]
    if data['status'] not in valid_statuses:
        abort(400, description="Invalid status value")

    deadline = None
    if data.get('deadline'):
        try:
            deadline = datetime.strptime(data['deadline'], '%Y-%m-%d')
        except ValueError:
            abort(400, description="Invalid deadline format, expected YYYY-MM-DD")

    task = Task(
    title=data['title'],
    description=data['description'], 
    status=data['status'],
    deadline=deadline,
    subtasks=[Subtask(title=subtask if isinstance(subtask, str) else subtask['title']) for subtask in data.get('subTasks', [])])

    db.session.add(task)
    db.session.commit()
    
    return jsonify(task.to_dict()), 201


# API Route: Update Task
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id) 
    data = request.json

    if not data:
        abort(400, description="Request body cannot be empty")

    # Update task fields
    if data.get('title'):
        task.title = data['title']
    if data.get('description'):
        task.description = data['description']
    if data.get('status'):
        valid_statuses = ["pending", "in-progress", "done"]
        if data['status'] not in valid_statuses:
            abort(400, description="Invalid status value")
        task.status = data['status']
    if 'deadline' in data:
        if data['deadline']:
            try:
                task.deadline = datetime.strptime(data['deadline'], '%Y-%m-%d')
            except ValueError:
                abort(400, description="Invalid deadline format, expected YYYY-MM-DD")
        else:
            task.deadline = None
            
    # Handle subtasks update
    if 'subTasks' in data:
        # Remove existing subtasks
        for subtask in task.subtasks:
            db.session.delete(subtask)
        
        # Add new subtasks
        for subtask_data in data['subTasks']:
            if isinstance(subtask_data, str):
                new_subtask = Subtask(title=subtask_data, task_id=task.id)
            else:
                new_subtask = Subtask(title=subtask_data.get('title', ''), task_id=task.id)
            db.session.add(new_subtask)

    db.session.commit()
    return jsonify(task.to_dict()), 200


# API Route: Delete Task
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

