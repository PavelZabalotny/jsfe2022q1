// Fisher-Yates shuffle algorithm
export default function shuffle( array ) {
	for ( let i = array.length - 1; i > 0; i-- ) {
		let j = randomNumberInRange( array );
		[ array[i], array[j] ] = [ array[j], array[i] ]
	}
	return array
}

// Get random number from 0 to array.length
function randomNumberInRange( array ) {
	return Math.floor( Math.random() * array.length ) // random index at 0 to i
}