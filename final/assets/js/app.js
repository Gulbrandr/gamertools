var app = angular.module("myapp", ["firebase"]),
	//dice functions
	dice = function(sides) {
		return Math.floor(Math.random() * (sides - 1) + 1)
	},
	CalculateScore = function(abil) {
		return Math.floor((abil - 10) / 2)
	},
	ref = new Firebase("https://gamertools.firebaseio.com");



app.directive("charinfo", function() {
	return {
		restrict: 'E',
		templateUrl: 'charinfo.html'
	};
});
app.filter("CalculateScores", function() {
	return function(abil) {
		return Math.floor((abil - 10) / 2)
	}

});


function CharController($scope, angularFire) {
	var charref = ref.child("Users/testUser/Characters");
	angularFire(charref, $scope, "Characters");
}
app.controller("abilCtrl", ["$scope", "$firebase", "$location",
	function($scope, $firebase, $location) {
		//alert($location.absUrl());//debug
		$scope.newset = function() {
			$scope.Abil = {
				str: dice(8) + 10,
				dex: dice(8) + 10,
				con: dice(8) + 10,
				int: dice(8) + 10,
				wis: dice(8) + 10,
				cha: dice(8) + 10
			};
		};
		$scope.newset();
		$scope.reset = function(){
			$scope.height = "";
			$scope.weight = "";
			$scope.homeland = "";
			$scope.gender = "";
			$scope.hair = "";
			$scope.eyes = "";
			$scope.diety = "";
			$scope.Description = "";
		}
		$scope.reset();
		

		$scope.addchar = function() {
			if (typeof $scope.charName === "undefined" || $scope.charName === "") {
				$scope.charNameError = "You Must Name Your Character!";
				event.preventDefault();
			} else {
				if (typeof $scope.Description === "undefined") {
					$scope.Description = "It was the coldest day of the coldest winter when " + $scope.charName + " was born. The elders said he wouldnt survive the night...";
				}
				$scope.charNameError = "";
				var charref = ref.child("Users/testUser/Characters/" + $scope.charName);
				$scope.char = $firebase(charref);
				console.log("the char " + $scope.charName + " was added to the database  at " + charref);
				$scope.char.$set({
					Name: $scope.charName,
					Abilities: {
						Str: $scope.Abil.str,
						Dex: $scope.Abil.dex,
						Con: $scope.Abil.con,
						Int: $scope.Abil.int,
						Wis: $scope.Abil.wis,
						Cha: $scope.Abil.cha
					},
					Scores: {
						StrScore: CalculateScore($scope.Abil.str),
						DexScore: CalculateScore($scope.Abil.dex),
						ConScore: CalculateScore($scope.Abil.con),
						IntScore: CalculateScore($scope.Abil.int),
						WisScore: CalculateScore($scope.Abil.wis),
						ChaScore: CalculateScore($scope.Abil.cha)
					},
					Description: $scope.Description,
					Height: $scope.height,
					Weight: $scope.weight,
					Homeland: $scope.homeland,
					Gender: $scope.gender,
					Hair: $scope.hair,
					Eyes: $scope.eyes,
					Diety: $scope.diety,
					Level: 1,
					Class: "Fighter",
					Race: "Human"
				});
			}
		}

	}
]);
app.controller("skillCtrl", ["$scope", "$firebase", "$location",
	function($scope, $firebase, $location) {
		$scope.charName = $location.search().Name;

		var skillref = ref.child("DATA/Skill List"),
			charref = ref.child("Users/testUser/Characters/" + $scope.charName);
		$scope.skills = $firebase(skillref);
		$scope.char = $firebase(charref);

		$scope.reset =function(){
			$scope.Acrobatics = 0;
			$scope.Appraise = 0;
			$scope.Bluff = 0;
			$scope.Climb = 0;
			$scope.Craft = 0;
			$scope.Diplomacy = 0;
			$scope.DisableDevice = 0;
			$scope.Disguise = 0;
			$scope.EscapeArtist = 0;
			$scope.Fly = 0;
			$scope.HandleAnimal = 0;
			$scope.Heal = 0;
			$scope.Intimidate = 0;
			$scope.Arcana = 0;
			$scope.Dungeoneering = 0;
			$scope.Engineering = 0;
			$scope.Geography = 0;
			$scope.History = 0;
			$scope.Local = 0;
			$scope.Nature = 0;
			$scope.Nobility = 0;
			$scope.Planes = 0;
			$scope.Religion = 0;
			$scope.Linguistics = 0;
			$scope.Perception = 0;
			$scope.Perform = 0;
			$scope.Profession = 0;
			$scope.Ride = 0;
			$scope.SenseMotive = 0;
			$scope.SleightofHand = 0;
			$scope.Spellcraft = 0;
			$scope.Stealth = 0;
			$scope.Survival = 0;
			$scope.Swim = 0;
			$scope.UseMagicDevice = 0;
		}
		$scope.reset();

		$scope.setskills = function() {
			var charskillref = charref.child("CharSkills"),
				isvaliddata = true;
			
			console.log("the char " + $scope.charName + " skills was added to the database  at " + charskillref);
			$scope.charskills = $firebase(charskillref);
			$scope.skilltotal = $scope.Acrobatics + $scope.Appraise + $scope.Bluff + $scope.Climb + $scope.Craft + $scope.Diplomacy + $scope.DisableDevice + $scope.Disguise + $scope.EscapeArtist + $scope.Fly + $scope.HandleAnimal + $scope.Heal + $scope.Intimidate + $scope.Arcana + $scope.Dungeoneering + $scope.Engineering + $scope.Geography + $scope.History + $scope.Local + $scope.Nature + $scope.Nobility + $scope.Planes + $scope.Religion + $scope.Linguistics + $scope.Perception + $scope.Perform + $scope.Profession + $scope.Ride + $scope.SenseMotive + $scope.SleightofHand + $scope.Spellcraft + $scope.Stealth + $scope.Survival + $scope.Swim + $scope.UseMagicDevice;
			if ($scope.skilltotal === 0) {
				$scope.skillerror = "You Dont Have enough Skills chosen please choose more!";
				event.preventDefault();
				isvaliddata = false;
			}
			if ($scope.skilltotal > ($scope.char.Scores.IntScore + 2)) {
				$scope.skillerror = "You have chosen to many skills please subtract some!"
				event.preventDefault();
				isvaliddata = false;
			}
			if ($scope.skilltotal < ($scope.char.Scores.IntScore + 2)) {
				$scope.skillerror = "You Dont Have enough Skills chosen please choose more!";
				event.preventDefault();
				isvaliddata = false;
			}
			if (isvaliddata) {
				$scope.skillerror = "";
				$scope.charskills.$set({
					Acrobatics: {
						Score: $scope.Acrobatics,
						Name: "Acrobatics"
					},
					Appraise: {
						Score: $scope.Appraise,
						Name: "Appraise"
					},
					Bluff: {
						Score: $scope.Bluff,
						Name: "Bluff"
					},
					Climb: {
						Score: $scope.Climb,
						Name: "Climb"
					},
					Craft: {
						Score: $scope.Craft,
						Name: "Craft"
					},
					Diplomacy: { 
						Score: $scope.Diplomacy,
						Name: "Diplomacy"
					},
					DisableDevice: {
						Score: $scope.DisableDevice,
						Name: "Disable Device"
					},
					Disguise: {
						Score: $scope.Disguise,
						Name: "Disguise"
					},
					EscapeArtist: {
						Score: $scope.EscapeArtist,
						Name: "Escape Artist"
					},
					Fly:{
						Score: $scope.Fly,
						Name: "Fly"
					},
					HandleAnimal: {
						Score: $scope.HandleAnimal,
						Name: "Handel Animal"
					},
					Heal: {
						Score: $scope.Heal,
						Name: "Handel Animal",
					},
					Intimidate: {
						Score: $scope.Intimidate,
						Name: "Intimidate"
					},
					Arcana:{
						Score:$scope.Arcana,
						Name: "Arcane"
					},
					Dungeoneering: {
						Score: $scope.Dungeoneering,
						Name: "Dungeoneering"
					},
					Engineering:{
						Score: $scope.Engineering,
						Name: "Engineering"
					},
					Geography: {
						Score: $scope.Geography,
						Name: "Geography"
					},
					History: {
						Score:$scope.History,
						Name: "History"
					},
					Local:{
						Score:$scope.Local,
						Name: "Local"
					},
					Nature:{
						Score: $scope.Nature,
						Name: "Nature"
					},
					Nobility:{
						Score: $scope.Nobility,
						Name: "Nobility"
					},
					Planes: {
						Score: $scope.Planes,
						Name: "Planes"
					},
					Religion: {
						Score: $scope.Religion,
						Name: "Religion"
					},
					Linguistics: {
						Score: $scope.Linguistics,
						Name: "Linguistics"
					},
					Perception: {
						Score: $scope.Perception,
						Name: "Perception"
					},
					Perform:{ 
						Score:$scope.Perform,
						Name: "Perform"
					},
					Profession:{
						Score: $scope.Profession,
						Name: "Profession"
					},
					Ride:{
						Score: $scope.Ride,
						Name: "Ride"
					},
					SenseMotive:{
						Score: $scope.SenseMotive,
						Name: "Sense Motive"
					},
					SleightofHand:{
						Score: $scope.SleightofHand,
						Name: "Sleight of Hand"
					},
					Spellcraft:{
						Score: $scope.Spellcraft,
						Name: "Spellcraft"
					},
					Stealth:{
						Score: $scope.Stealth,
						Name: "Stealth"
					},
					Survival: { 
						Score: $scope.Survival,
						Name: "Survival"
					},
					Swim:{
						Score: $scope.Swim,
						Name:"Swim"
					},
					UseMagicDevice:{
						Score: $scope.UseMagicDevice,
						Name: "Use Magic Device"
					}
				});
			}
		}
	}

]);
app.controller("featCtrl", ["$scope", "$firebase", "$location","$http",
	function($scope, $firebase, $location, $http) {
		$scope.charName = $location.search().Name;
		var charref = ref.child("Users/testUser/Characters/" + $scope.charName)
			featref = ref.child("DATA/TestFeats"),
			equipmentref = ref.child("DATA/TestArmor");

		$scope.Feats = $firebase(featref);		
		$scope.Equipment = $firebase(equipmentref);
		$scope.setfeats = function(){
			

			var charfeatref = charref.child("CharFeats"),
				charequipmentref = charref.child("CharEquipment"),
				isvaliddata = true;

			$scope.CharFeats = $firebase(charfeatref);
			$scope.CharEquipment = $firebase(charequipmentref);
			if (typeof $scope.humanfeat === "undefined"){
				$scope.humanfeaterror = "please choose a human feat"
				isvaliddata = false;
				event.preventDefault();
			}
			if (typeof $scope.firstfeat === "undefined"){
				$scope.firstfeaterror = "please choose a 1st level feat"
				isvaliddata = false;
				event.preventDefault();
			}			
			if (isvaliddata){
				$scope.humanfeaterror = "";
				$scope.firstfeaterror = "";
				$scope.CharEquipment.$set({
					Armor: $scope.Equipment.Armor,
					Weapon: $scope.Equipment.Weapon,
					Shield: $scope.Equipment.Shield
				});
				console.log("the char " + $scope.charName + " feats and Equipment was added to the database  at " + charequipmentref + " and " + charfeatref);
				$scope.CharFeats.$set({
					HumanFeat: $scope.humanfeat,
					FirstFeat: $scope.firstfeat
				});
			}
		}
		
	}
]);
app.controller("DisplayCharCtrl", ["$scope", "$firebase", "$location","$http",
	function($scope, $firebase, $location, $http) {
		$scope.charName = $location.search().Name;
		var charref = ref.child("Users/testUser/Characters/" + $scope.charName),
			skillref = ref.child("DATA/Skill List");
		$scope.Character = $firebase(charref);		
	}
]);


//EOF