from app_factory import create_app

app = create_app()

if __name__ == "__main__":
    from model import db
    with app.app_context():
        db.create_all()