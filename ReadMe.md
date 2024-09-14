You Need To Run The Following Commands In Your Terminal. First Locate And cd Towards The Text Editor Project Folder Then :
$ python3 -m venv venv
$ source venv/bin/activate
(venv)$ pip install Flask (Make Sure Flask Is Installed)
(venv)$ export FLASK_APP=app.py 
(venv)$ flask run

Now You Can Access 127.0.0.1:5000 To Acess The Text Editor. Remember The Saved Files Will Go To  :
/Text Editor/uploads/
And To Save File Using Text Editor Enter The Filename And Click Save In The Top Right Corner. 
And To Search For Existing File Type Name Of Saved File In The Search In Uploads Bar. If File Is Located Its Name Will Be Displayed In Drop-Down Menu 
Below The Searchbar Upon Clicking It. It Will Restore And Load The Content Saved In Those Files.
Thank You!
