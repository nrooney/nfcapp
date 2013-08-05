var db;
var dbCreated = false;

function startDatabase(){
	db = window.openDatabase("nfctagapp", "1.0", "PhoneGap Demo", 200000);
    if (dbCreated){
        db.transaction(getStats, transaction_error);
    }
    else{
        db.transaction(populateDB, transaction_error, populateDB_success);
    }
}

function transaction_error(tx, error) {
	//$('#busy').hide(); //no busy yet
    alert("Database Error: " + error);
}

function getStats(){

}

function populateDB(){
	$('#busy').show();
	tx.executeSql('DROP TABLE IF EXISTS Person');
	var sql = "CREATE TABLE IF NOT EXISTS Person ("+ //PERSON
		"PersonID INTEGER NOT NULL PRIMARY KEY,"+
		"name VARCHAR(255),"+
		"Twiter_ac VARCHAR(255),"+
		"dateRegistered TIMESTAMP,"+
		"points INTEGER,"+
		"fitnesspoints INTEGER,"+
		")";
    tx.executeSql(sql);

    sql = "CREATE TABLE IF NOT EXISTS Companies ("+ //COMPANIES
		"companyID INTEGER NOT NULL,"+
		"companyName VARCHAR(255),"+
		"PRIMARY KEY (companyID)"+
		")";
    tx.executeSql(sql);

    sql = "CREATE TABLE IF NOT EXISTS Nfctags ("+ //NFCTAGS
		"NFC_TagID INTEGER NOT NULL,"+
		"xaxis INTEGER NOT NULL ,"+
		"yaxis INTEGER NOT NULL ,"+
		"companyID INTEGER NOT NULL,"+
		"totalTaps INTEGER,"+
		"PRIMARY KEY (NFC_TagID),"+
		"FOREIGN KEY (companyID) REFERENCES Companies(companyID)"+
		")";
    tx.executeSql(sql);

     sql = "CREATE TABLE IF NOT EXISTS Clues ("+ //CLUES
		"clueID INTEGER NOT NULL,"+
		"clueText VARCHAR(255),"+
		"clueFound BIT NOT NULL  DEFAULT 0,"+
		"NFC_TagID INTEGER NOT NULL,"+
		"PRIMARY KEY (clueID),"+
		"FOREIGN KEY (NFC_TagID) REFERENCES Nfctags(NFC_TagID)"+
		")";
    tx.executeSql(sql);

    sql = "CREATE TABLE IF NOT EXISTS rules ("+ //RULES
		"ruleID INTEGER NOT NULL PRIMARY KEY,"+
		"ruleText VARCHAR(255), //too small?"+
		"ruleFound BIT NOT NULL  DEFAULT 0"+
		")";
    tx.executeSql(sql);

    sql = "CREATE TABLE IF NOT EXISTS Taps ("+ //TAGS
		"id INTEGER PRIMARY KEY AUTO_INCREMENT,"+
		"NFC_TagID INTEGER NOT NULL,"+
		"PersonID INTEGER NOT NULL,"+
		"Timestamp TIMESTAMP,"+
		"PRIMARY KEY (id),"+
		"FOREIGN KEY (NFC_TagID) REFERENCES Nfctags(NFC_TagID),"+
		"FOREIGN KEY (PersonID) REFERENCES Person(PersonID)"+
		")";
    tx.executeSql(sql);

    //person
    tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (1,'first person','@first',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (2,'second person','@second',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (3,'third person','@third',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (4,'forth person','@forth',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (5,'fifth person','@fifth',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (6,'sixth person','@sixth',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (7,'seventh person','@seventh',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (8,'eighth person','@eighth',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (9,'ninth person','@ninth',0,0)");
	tx.executeSql("INSERT INTO Person (PersonID,name,Twiter_ac,points,fitnesspoints) VALUES (10,'tenth person','@tenth',0,0)");

	//companies
	tx.executeSql("INSERT INTO Companies (companyID,companyName) VALUES (1,'A_company')");
	tx.executeSql("INSERT INTO Companies (companyID,companyName) VALUES ((2,'B_company')");
	tx.executeSql("INSERT INTO Companies (companyID,companyName) VALUES ((3,'C_company')");
	tx.executeSql("INSERT INTO Companies (companyID,companyName) VALUES ((4,'AB_company')");
	tx.executeSql("INSERT INTO Companies (companyID,companyName) VALUES ((5,''BC_company)");

	//nfctags
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (1,0,0,1,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (2,6,0,2,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (3,2,2,3,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (4,4,3,4,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (5,8,4,5,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (6,6,6,5,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (7,1,7,4,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (8,4,7,3,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (9,2,9,2,0)");
	tx.executeSql("INSERT INTO Nfctags (NFC_TagID,xaxis,yaxis,companyID,totalTaps) VALUES (10,9,9,1,0)");

	//clues
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (1,'Clue for no.1 [0,0]',0,1)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (2,Clue for no.2 [6,0]'',0,2)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (3,'Clue for no.3 [2,2]',0,3)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (4,'Clue for no.4 [4,3]',0,4)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (5,'Clue for no.5 [8,4]',0,5)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (6,'Clue for no.6 [6,6]',0,6)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (7,'Clue for no.7 [1,7]',0,7)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (8,'Clue for no.8 [4,7]',0,8)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (9,'Clue for no.9 [2,9]',0,9)");
	tx.executeSql("INSERT INTO Clues (clueID,clueText,clueFound,NFC_TagID) VALUES (10,'Clue for no.10 [9,9]',0,10)");

	//rules
	tx.executeSql("INSERT INTO Companies (ruleID,ruleText,ruleFound) VALUES (1,'company same first letter',0)");
	tx.executeSql("INSERT INTO Companies (ruleID,ruleText,ruleFound) VALUES (2,'next numerical nfc tag',0)");
	tx.executeSql("INSERT INTO Companies (ruleID,ruleText,ruleFound) VALUES (3,'company next letter in alphabet',0)");
	tx.executeSql("INSERT INTO Companies (ruleID,ruleText,ruleFound) VALUES (4,'same company',0)");
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getStats, transaction_error);
}