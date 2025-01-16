// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (N/A) Special grammar: (please specify which)
// (X) Support announcing highway exits

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "Safani ni urefu wa" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "njia ya re-mahesabu" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "umbali" : "distance.ogg";

	// LEFT/RIGHT
	dictionary["after"] = tts ? "baada ya" : "after.ogg";
	dictionary["in"] = tts ? "katika" : "in.ogg";

	dictionary["left"] = tts ? "geuka upande wa kushoto" : "left.ogg";
	dictionary["left_sh"] = tts ? "geuka sana upande wa kushoto" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "geuka kiasi upande wa kushoto" : "left_sl.ogg";
	dictionary["right"] = tts ? "geuka upande wa kulia" : "right.ogg";
	dictionary["right_sh"] = tts ? "geuka sana upande wa kulia" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "geuka kiasi upande wa kulia" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "kaa upande wa kushoto" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "kaa upande wa kulia" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "kaa upande wa kushoto" : "left_bear.ogg";  // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "kaa upande wa kulia" : "right_bear.ogg";   // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["prepare_make_uturn"] = tts ? "Tayarisha kugeuka nyuma baada ya" : "prepare_make_uturn.ogg";
	dictionary["make_uturn1"] = tts ? " geuka nyuma" : "make_uturn1.ogg";
	dictionary["make_uturn2"] = tts ? "Tafandali geuka kwa u turn" : "make_uturn2.ogg";
	dictionary["make_uturn_wp"] = tts ? "wakati inawezekana, tafadhali kufanya u-kugeuka" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Tayarisha kuingia mzunguko baada ya" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? " ingia mzunguko, na uchukue upande wa" : "roundabout.ogg";
	dictionary["then"] = tts ? "kisha" : "then.ogg";
	dictionary["and"] = tts ? "na" : "and.ogg";
	dictionary["take"] = tts ? "chukua upande wa" : "take.ogg";
	dictionary["exit"] = tts ? "kutoka" : "exit.ogg";

	dictionary["1st"] = tts ? "kwanza" : "1st.ogg";
	dictionary["2nd"] = tts ? "pili" : "2nd.ogg";
	dictionary["3rd"] = tts ? "tatu" : "3rd.ogg";
	dictionary["4th"] = tts ? "nne" : "4th.ogg";
	dictionary["5th"] = tts ? "tano" : "5th.ogg";
	dictionary["6th"] = tts ? "sita" : "6th.ogg";
	dictionary["7th"] = tts ? "saba" : "7th.ogg";
	dictionary["8th"] = tts ? "nane" : "8th.ogg";
	dictionary["9th"] = tts ? "tisa" : "9th.ogg";
	dictionary["10th"] = tts ? "kumi" : "10th.ogg";
	dictionary["11th"] = tts ? "kumi na moja" : "11th.ogg";
	dictionary["12th"] = tts ? "kumi na mbili" : "12th.ogg";
	dictionary["13th"] = tts ? "kumi na tatu" : "13th.ogg";
	dictionary["14th"] = tts ? "kumi na nne" : "14th.ogg";
	dictionary["15th"] = tts ? "kumi na tano" : "15th.ogg";
	dictionary["16th"] = tts ? "kumi na sita" : "16th.ogg";
	dictionary["17th"] = tts ? "kumi na saba" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Endelea moja kwa moja mbele" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Endesha kwa" : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "na ufike kifiko" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "umefika" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "na kufika katika yako kupitia-uhakika" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "wewe na kufikiwa yako kupitia-uhakika" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "na kufika katika yako kupitia-uhakika GPX" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "wewe na kufikiwa yako kupitia-uhakika GPX" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "and pass favorite" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "you are passing favorite" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "and pass POI" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "you are passing POI" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "wewe ni mno kikomo kasi" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "kikomo kasi" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "attention" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "kamera kasi" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "mpaka kudhibiti" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "reli kuvuka" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "kutuliza trafiki" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "toll kibanda" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "kuacha ishara" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "kuvuka pedestrian" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunnel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "g p s ishara waliopotea" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "g p s signal restored" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "una jitenga na njia" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "wewe ni nyuma juu ya njia" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "kwenye" : "onto.ogg";
	dictionary["on"] = tts ? "kwenye" : "on.ogg";
	dictionary["to"] = tts ? "kwenye" : "to.ogg";
	dictionary["toward"] = tts ? "kuelekea" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "mita" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "umbali wa kilomita moja" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "kuhusu" : "around.ogg";
	dictionary["kilometers1"] = tts ? "kilomita" : "kilometers1.ogg";
	dictionary["kilometers2"] = tts ? "kilometa" : "kilometers2.ogg";

	dictionary["feet"] = tts ? "futi" : "feet.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "sehemu ya kumi ya maili" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "kuhusu maili moja" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "maili" : "miles.ogg";
	dictionary["yards"] = tts ? "yardi" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "wakati zinahitajika" : "time.ogg";
	dictionary["1_hour"] = tts ? "saa moja" : "1_hour.ogg";
	dictionary["hours"] = tts ? "masaa" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "chini ya dakika moja" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "dakika moja" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "dakika" : "minutes.ogg";
}


//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////
function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
	populateDictionary(mode);
}

function route_new_calc(dist, timeVal) {
	return dictionary["route_is"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return dictionary["meters"] + " " + (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist)));
			} else if (dist < 100) {
				return dictionary["meters"] + " " + (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10));
			} else if (dist < 1000) {
				return dictionary["meters"] + " " + (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50));
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer"];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + dictionary["kilometers1"] + " " + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0)));
			} else {
				return dictionary["kilometers2"] + " " + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) ;
			}
			break;
		case "mi-f":
			if (dist < 91) {
				return dictionary["feet"] + " " + (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50));
			} else if (dist < 320) {
				return dictionary["feet"] + " " + (tts ? (Math.round(dist/100.0/0.3048)*100).toString() : ogg_dist(Math.round(dist/100.0/0.3048)*100));
			} else if (dist < 1367) {
				return dictionary["tenths_of_a_mile"] + " " + (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0)));
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + " " + dictionary["miles"] (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3)));
			} else {
				
			}
			break;
		case "mi-m":
			if (dist < 17 ) {
				return dictionary["meters"] + " " + (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist)));
			} else if (dist < 100) {
				return dictionary["meters"] + " " + (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10));
			} else if (dist < 1300) {
				return dictionary["meters"] + " " + (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50));
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + " " + dictionary["miles"] (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3)));
			} else {
				return dictionary["miles"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3)));
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return dictionary["yards"] + " " + (tts ? Math.round(dist/0.9144).toString() : ogg_dist(Math.round(dist/0.9144)));
			} else if (dist < 100) {
				return dictionary["yards"] + " " + (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10));
			} else if (dist < 1300) {
				return dictionary["yards"] + " " + (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)); 
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + " " + dictionary["miles"] (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3)));
			} else {
				return dictionary["miles"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3)));
			}
			break;
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 30) {
		return dictionary["less_a_minute"];
	} else if (minutes % 60 == 0 && tts) {
		return hours(minutes);
	} else if (minutes % 60 == 1 && tts) {
		return hours(minutes) + " " + dictionary["1_minute"];
	} else if (tts) {
		return hours(minutes) + " " + (minutes % 60) + " " + dictionary["minutes"];
	} else if (!tts && seconds < 300) {
		return ogg_dist(minutes) + dictionary["minutes"];
	} else if (!tts && oggMinutes % 60 > 0) {
		return hours(oggMinutes) + " " + ogg_dist(oggMinutes % 60) + dictionary["minutes"];
	} else if (!tts) {
		return hours(oggMinutes);
	}
}

function hours(minutes) {
	if (minutes < 60) {
		return "";
	} else if (minutes < 120) {
		return dictionary["1_hour"];
	} else {
		var hours = Math.floor(minutes / 60);
        return (tts ? hours.toString() : ogg_dist(hours)) + " " + dictionary["hours"]; 
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + (tts ? ". " : " ") + dictionary["distance"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist) + " " + follow_street(streetName);
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return dictionary["to"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"] || 
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		return dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " "
			+ getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toStreetName"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"];
	} else {
		return "";
	}
}

function getExitNumber(exitString, exitInt) {
	if (!tts && exitInt > 0 && exitInt < 18) {
		return nth(exitInt) + " " + dictionary["exit"];
	} else if (tts) {
		return dictionary["exit"] + " " + exitString;
	} else {
		return dictionary["exit"];
	}
}

function getTurnType(turnType) {
	switch (turnType) {
		case "left":
			return dictionary["left"];
			break;
		case "left_sh":
			return dictionary["left_sh"];
			break;
		case "left_sl":
			return dictionary["left_sl"];
			break;
		case "right":
			return dictionary["right"];
			break;
		case "right_sh":
			return dictionary["right_sh"];
			break;
		case "right_sl":
			return dictionary["right_sl"];
			break;
		case "left_keep":
			return dictionary["left_keep"];
			break;
		case "right_keep":
			return dictionary["right_keep"];
			break;
	}
}

function then() {
	return (tts ? ", " : " ") + dictionary["then"] + " ";
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1) {
		return dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if ((streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"])) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		return dictionary["onto"] + " " + assemble_street_name(streetName);
	}
	return "";
}

function assemble_street_name(streetName) {
	if (streetName["toDest"] == "") {
		return streetName["toRef"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] == "") {
		return streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] != "") {
		return streetName["toRef"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	}
}

function nth(exit) {
	switch (exit) {
		case (1):
			return dictionary["1st"];
		case (2):
			return dictionary["2nd"];
		case (3):
			return dictionary["3rd"];
		case (4):
			return dictionary["4th"];
		case (5):
			return dictionary["5th"];
		case (6):
			return dictionary["6th"];
		case (7):
			return dictionary["7th"];
		case (8):
			return dictionary["8th"];
		case (9):
			return dictionary["9th"];
		case (10):
			return dictionary["10th"];
		case (11):
			return dictionary["11th"];
		case (12):
			return dictionary["12th"];
		case (13):
			return dictionary["13th"];
		case (14):
			return dictionary["14th"];
		case (15):
			return dictionary["15th"];
		case (16):
			return dictionary["16th"];
		case (17):
			return dictionary["17th"];
	}
}

function make_ut(dist, streetName) {
	if (dist == -1) {
		return dictionary["make_uturn1"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["make_uturn2"] + " " + turn_street(streetName);
	}
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + dest;
}

function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + " " + dest;
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + " " + dest;
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + " " + dest;
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + " " + dest;
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + " " + dest;
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest;
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + " " + dest;
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + " " + dest;
}

function location_lost() {
	return dictionary["location_lost"];
}

function location_recovered() {
	return dictionary["location_recovered"];
}

function off_route(dist) {
	return dictionary["off_route"] + " " + distance(dist);
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	return dictionary["make_uturn_wp"];
}

// TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
	return dictionary["exceed_limit"] + " " + maxSpeed.toString();
}

function attention(type) {
	return dictionary["attention"] + (tts ? ", " : " ") + getAttentionString(type);
}

function getAttentionString(type) {
	switch (type) {
		case "SPEED_CAMERA":
			return dictionary["speed_camera"];
			break;
		case "SPEED_LIMIT":
			return "";
			break
		case "BORDER_CONTROL":
			return dictionary["border_control"];
			break;
		case "RAILWAY":
			return dictionary["railroad_crossing"];
			break;
		case "TRAFFIC_CALMING":
			return dictionary["traffic_calming"];
			break;
		case "TOLL_BOOTH":
			return dictionary["toll_booth"];
			break;
		case "STOP":
			return dictionary["stop"];
			break;
		case "PEDESTRIAN":
			return dictionary["pedestrian_crosswalk"];
			break;
		case "MAXIMUM":
			return "";
			break;
		case "TUNNEL":
			return dictionary["tunnel"];
			break;
		default:
			return "";
			break;
	}
}

function ogg_dist(distance) {
	if (distance == 0) {
		return "";
	} else if (distance < 20) {
		return Math.floor(distance).toString() + ".ogg ";
	} else if (distance < 1000 && (distance % 50) == 0) {
		return distance.toString() + ".ogg ";
	} else if (distance < 30) {
		return "20.ogg " + ogg_dist(distance - 20);
	} else if (distance < 40) {
		return "30.ogg " + ogg_dist(distance - 30);
	} else if (distance < 50) {
		return "40.ogg " + ogg_dist(distance - 40);
	} else if (distance < 60) {
		return "50.ogg " + ogg_dist(distance - 50);
	} else if (distance < 70) {
		return "60.ogg " + ogg_dist(distance - 60);
	} else if (distance < 80) {
		return "70.ogg " + ogg_dist(distance - 70);
	} else if (distance < 90) {
		return "80.ogg " + ogg_dist(distance - 80);
	} else if (distance < 100) {
		return "90.ogg " + ogg_dist(distance - 90);
	} else if (distance < 200) {
		return "100.ogg " + ogg_dist(distance - 100);
	} else if (distance < 300) {
		return "200.ogg " + ogg_dist(distance - 200);
	} else if (distance < 400) {
		return "300.ogg " + ogg_dist(distance - 300);
	} else if (distance < 500) {
		return "400.ogg " + ogg_dist(distance - 400);
	} else if (distance < 600) {
		return "500.ogg " + ogg_dist(distance - 500);
	} else if (distance < 700) {
		return "600.ogg " + ogg_dist(distance - 600);
	} else if (distance < 800) {
		return "700.ogg " + ogg_dist(distance - 700);
	} else if (distance < 900) {
		return "800.ogg " + ogg_dist(distance - 800);
	} else if (distance < 1000) {
		return "900.ogg " + ogg_dist(distance - 900);
	} else {
		return ogg_dist(distance/1000) + "1000.ogg " + ogg_dist(distance % 1000);
	}
}
