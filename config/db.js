module.exports = {
  url : "mongodb://user1:password1@ds111963.mlab.com:11963/notable"
}

// mongo ds111963.mlab.com:11963/notable -u user1 -p password1

// ./mongoexport -h ds111963.mlab.com:11963 -d notable -c notes -u user1 -p password1 -o notes.csv --csv -f title, text
// mongoexport -h ds111963.mlab.com:11963 -d notable -c <collection> -u <user> -p <password> -o <output file>
// ./mongoexport --db notable --collection notes --out resultNoteExport.json
