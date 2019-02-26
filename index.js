// 'use strict';

const apikey = "mbfkKGBbubvP2wO3pL2At9mZY5mf8ykDxTHJ6YTd";

function displayParks(parks) {
	console.log('displaying parks in DOM');
	console.log(parks);
	$('#results-list').empty(); //empty the screen of old results
	for (let i=0; i<(parks.data.length-1); i++) {
		$('#results-list').append(
			`<li> <h3>${parks.data[i].fullName}</h3>
			 <p> ${parks.data[i].description}</p> 
			 <p><a href="${parks.data[i].url}">${parks.data[i].url}</p>
			 </li>`)
	}
	$('#results').removeClass('hidden');
}

function getParks(stateCodes, maxNum) {
	console.log('getting parks');
	fetch(`https://api.nps.gov/api/v1/parks?stateCode=${stateCodes}&limit=${maxNum}
		&api_key=${apikey}`)
		.then(response => {
			if (response.ok) {
				return response.json()
			}
			throw new Error(response.statusText);
		})
		.then(responseJson => displayParks(responseJson))
		.catch(error => alert('The request is not formatted correctly. Please try again.'))
}

function watchForm() {
  $('button').click(event => {
    console.log('clicking button');
    event.preventDefault();
    let states = $('#js-states').val();
    let maxResults = $('#js-max-results').val();
    console.log(states);
    console.log(maxResults);
    getParks(states, maxResults);
  });
}

$(function() {
  console.log('Mulan NPS App loaded! Waiting for submit!');
  watchForm();
});
