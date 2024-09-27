//Examples
const carList = [
	{
		id: 0,
		name: "Super Mario 64",
		console: "Nintendo 64",
		genre: "3D Platformer"
	},
	{
		id: 1,
		name: "Halo",
		console: "Xbox",
		genre: "First Person Shooter"
	}
];

//This moves the cursor to the first input text browser is selected
$(document).ready(function () {
	$("#form-name-input").focus();
});

// RENDERING
$(() => {
	renderInventoryList()
})

const $gamesContainer = $("#games-container");

function renderInventoryList() {
	$gamesContainer.empty()
	$gamesContainer.append(carList.map(car => renderCar(car)))
}


function renderCar(carParam) { //Adds games to table
	return $("<tr/>").append(
		$("<td/>").text(carParam.id + 1).attr("id", `${carParam.id}`),
		$("<td/>").text(carParam.name),
		$("<td/>").text(carParam.console),
		$("<td/>").text(carParam.genre),
		$("<td/>").addClass("d-grid gap-2 d-md-flex justify-content-md").append(
			$("<button>").addClass("btn btn-primary me-4").text("Edit").on("click", () => onStartGameEdit(carParam.id)),
			$("<button/>").addClass("btn btn-danger me-4").text("Delete").on("click", () => onDeleteButtonClick(carParam.id))			
		)
	)
}

//* EVENT LISTENERS
// setting car Id to null for use later
const carModal = new bootstrap.Modal('#car-edit-modal');
const $carModalTitle = $("#car-modal-title");
// for text inputs
const $formNameInput = $("#form-name-input");
const $formConsoleInput = $("#form-console-input");
const $formGenreInput = $("#form-genre-input");
// for modal inputs
const $modalNameInput = $("#modal-name-input");
const $modalConsoleInput = $("#modal-console-input");
const $modalGenreInput = $("#modal-genre-input");

const $addCarId = $("#id")

let editCarId = null;

function onSaveGame() {
	console.log('saving data inside of this function')
	// check if we're saving a create or an edit
	if (editCarId === null) {
		// get the name of the new game
		// create a new game and add it to the list
		carList.push({
			id: carList.length ? carList[carList.length - 1].id + 1 : 0,
			name: $formNameInput.val(),
			console: $formConsoleInput.val(),
			genre: $formGenreInput.val()
		});
		console.log('This is the added ID:', carList.length ? carList[carList.length - 1].id + 1 : 0);
		console.log('This is the added Name:', $formNameInput.val());
		console.log('This is the added Console:', $formConsoleInput.val());
		console.log('This is the added Genre:', $formGenreInput.val());
		$formNameInput.val('');
		$formConsoleInput.val('');
		$formGenreInput.val('');

		// console logging the data that was just added
		let index = -1;
		console.log('Added this game to table:', carList.at(index));
	}
	else {
		// Find the game we're editing
		const car = carList.find(car => car.id === editCarId);
		// Update it with any edited info
		car.name = $modalNameInput.val();
		car.console = $modalConsoleInput.val();
		car.genre = $modalGenreInput.val();
		console.log('Car values were changed to:', car)
	}

	// rerender the list of games
	renderInventoryList();
	// close the modal
	carModal.hide();
}

function onStartGameEdit(gameId) {
	console.log('starting Edit process with ID:', gameId);
	// get the one that matches that id
	const car = carList.find(car => car.id === gameId);
	console.log('We are editing:', car)
	// open the modal
	carModal.show();
	// change the title of the modal
	$carModalTitle.text("Edit: " + car.name + ' ' + car.console + ' ' + car.genre);
	// Put the games's current data in the form
	$modalNameInput.val(car.name),
	$modalConsoleInput.val(car.console),
	$modalGenreInput.val(car.genre)
	// Say that we're editing this one
	editCarId = car.id;
	console.log(editCarId);
}

function onDeleteButtonClick(carId) {
	console.log('we are inside the delete function', (carId))
	const indexToDelete = carList.findIndex(car => car.id === carId)
	// console logging the delete game
	let index = 1;
	console.log('Deleting this game from table:', carList.at(index));
	// alert('Deleting this game from table:', carList.at(index));
	// removing from table
	carList.splice(indexToDelete, 1);
	renderInventoryList();
}

// This moves the cursor back to first text input for the next entry
$("#add").click(function () {
	$formNameInput.focus();
});

// Wait for document to load
$(document).ready(() => {
	$('.game-form').on('submit', () => {

		// prevents default behavior
		// Prevents event propagation
		return false;
	});
});
$('.game-form').keypress((e) => {

	// Enter key corresponds to number 13
	if (e.which === 13) {
		onSaveGame();
		console.log('Form Successfully Submitted');
	}
	$("#form-name-input").focus();
})
