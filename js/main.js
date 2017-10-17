//Hi - thanks for grading! I am shooting for exceeds!
//Note: the exceeds sections are: cc field changes in real time based on user input, all fields change in real time, color drop down menu is hidden

let valid = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
let $name = $('#name');
let $email = $('#mail');
let $activities = $('.activities');
let $checkedActivities = $('.activities input:checked');
let $cardNumber = $('#cc-num');
let $zip = $('#zip');
let $cvv = $('#cvv');

const messageName = 'Please enter a name.';
const messageEmail = 'Please enter a valid email.';
const messageCheckbox = 'Please check at least one activity.';
const messageZip = '5 digits please.';
const messageCVV = '3 digits please.';

//on page load

//give focus to the name field
$('#name').focus();
//hide the job role div
$('.otherJobRoleDiv').hide();

//job role section-----------------------------------

//Reveal job role div if "other" is selected.

function toggleOtherJobRole() {
    $('#title').change(function() {
    if(this.value === 'other') {
      $('.otherJobRoleDiv').toggle('slow');
    } else {
      $('.otherJobRoleDiv').hide('slow');
    }
  });
}
toggleOtherJobRole();

//t-shirt section--------------------------------------

//display the color options that match the design selected in the "Design" menu

function toggleTshirtSelection () {

  const $designSelection = $('#design');
  const $colorSelection = $('#color');

  $designSelection.change(function() {
    if (this.value === 'js puns') {
      $('.colors-js-puns').css('display', 'block');
      $colorSelection.empty().append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
    } else if (this.value === 'heart js') {
      $('.colors-js-puns').css('display', 'block');
      $colorSelection.empty().append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
     } else if (this.value === 'select theme') {
       $('.colors-js-puns').css('display', 'none');
    }
  });
}
toggleTshirtSelection();

//Register for Activities section-----------------------

//toggle conflicting activities passing in each id name

function toggleActivities(idName, idNameConflict) {
  $activities.change(function() {
  if ($(idName).is(':checked')) {
      $(idNameConflict).prop('disabled', true).parent().css('color', '#686868');
    } else {
      $(idNameConflict).prop('disabled', false).parent().css('color', '#000');
    }
  });
}
//functions returning and passing in the proper conflicting activities by ID

function idNameJsFrameworks () {
  return toggleActivities('#js-frameworks', '#express');
}
idNameJsFrameworks ();

function idNameJsLibs () {
  return toggleActivities('#js-libs', '#node');
}
idNameJsLibs ();

function idNameExpress () {
  return toggleActivities('#express', '#js-frameworks');
}
idNameExpress ();

function idNameNode () {
  return toggleActivities('#node', '#js-libs');
}
idNameNode ();

//As a user selects activities, a running total will display below the list of checkboxes

function register() {
  //creating the new div to display running total
  let $runningTotalFieldset = $('<fieldset class="totalFieldsetDiv"><legend class="totalLegendDiv"></legend></fieldset>').insertAfter('.activities').hide();
  //checking which checkboxes are clicked and adding the values together
  $('.activities input').click(function() {
    let $total = 0;
      $('.activities input:checked').each(function(){
      $total += parseFloat($(this).val());
  });
  //displaying the div if the total is not 0
  $('.totalLegendDiv').append().html('Total: $' + $total);
    if ($total !== 0) {
      $runningTotalFieldset.show();
    } else {
      $runningTotalFieldset.hide();
      }
  });
}
register ();

//Payment info section -----------------------------------

//Display paypal, bitcoin, or cc div based on the payment option selected


function selectPayment () {
  $('#payment').change(function() {

          if (this.value === 'paypal') {
            $('.paypal').css('display', 'block');
            $('#credit-card').hide();
            $('.bitcoin').hide();

          } else if (this.value === 'bitcoin') {
            $('.paypal').css('display', 'none');
            $('.bitcoin').css('display', 'block');
            $('.credit-card').hide();

          } else if (this.value === 'credit card' || this.value === 'select_method') {
            $('.credit-card').show('slow');
            $('.paypal').css('display', 'none');
            $('.bitcoin').css('display', 'none');
          }
      });
}
selectPayment();

//Form validation ---------------------------------------

//functions showErrorMessage, removeErrorMessage, validateKeyup - arguments defined -
//divID = div where error should show
//message = error message variable to be placed
//DIVSelector = div to add css red border to indicating error
//errorID = inserting an error id to each dynamic div so we can select the div to hide when validate

//errorDivRemove = input with css border color indication error
//errorIDRemove = div ID to remove error message

//divValidate = what div are we validating
//divErrorValidate = div ID to remove when input is validated
//functionValidate = event function to validate

//dynamically inserts error div with error message
function showErrorMessage (divID, message, DIVSelector, errorID) {
  let $errorDiv = $('<div class="error" id="' + errorID + '"></div>');
  $errorDiv.append().html(message).insertAfter(divID);
  DIVSelector.css('border-color', 'red');
}

//dynamically removes error div with correct input
function removeErrorMessage (errorDivRemove, errorIDRemove) {
  errorDivRemove.css('border-color', '#1da566');
  $(errorIDRemove).remove();
}
//validate in real time - error message will remove with correct user input
function validateKeyup (divValidate, divErrorValidate, functionValidate) {
  divValidate.keyup(function() {
  $(divErrorValidate).remove();//remove old errors to prevent duplicates
  functionValidate();
  });
}

//Name field------------------------------

//validate name field is not empty
function isNameValid () {
  return $name.val().length > 0;
  }

function nameEvent () {
  if (!isNameValid()) {
    showErrorMessage ($name, messageName, $name, 'nameError');
  } else {
    removeErrorMessage ($name, '#nameError');
  }
}
validateKeyup ($name, '#nameError', nameEvent);

//Email field------------------------------

//validate email
function isEmailValid () {
  return valid.test($email.val()) === true;
}
function emailEvent () {
  if (!isEmailValid()) {
    showErrorMessage ($email, messageEmail, $email, 'emailError');
  } else {
    removeErrorMessage ($email, '#emailError');
  }
}
validateKeyup ($email, '#emailError', emailEvent);

//Activities checkbox field------------------------------

//validate at least one checkbox is selected
function isOneActivitySelected () {
  return $('.activities input:checked').length > 0;
}
function activitiesCheckedEvent () {
  if (!isOneActivitySelected()) {
    showErrorMessage ($activities, messageCheckbox, $activities, 'activitiesError');
  } else {
    removeErrorMessage ($activities, '#activitiesError');
    }
 }
$activities.change(activitiesCheckedEvent); // real time click with error

//CC field------------------------------

//credit card field should only accept a number between 13 and 16 digits
function isCreditCardValid () {
  return $cardNumber.val().length >= 13 && $cardNumber.val().length <= 16 && $.isNumeric($cardNumber.val());
}
function creditCardNumberEvent () {
   if (!isCreditCardValid()) {
     showErrorMessage ($cardNumber, creditCardMessageFunction, $cardNumber, 'creditCardError');
   } else {
     removeErrorMessage($cardNumber, '#creditCardError');
   }
}
validateKeyup ($cardNumber, '#creditCardError', creditCardNumberEvent);

//dynammically change cc error message depending on how many cc digits, then calling the function in creditCardNumberEvent ()
function creditCardMessageFunction () {

let numberDigit;
let creditCardMessage;

  if ($cardNumber.val().length < 13) {
    numberDigit = 'Too few digits. ';
  } else if ($cardNumber.val().length > 16) {
    numberDigit = 'Too many digits. ';
  } else {
    numberDigit = 'Numeric Values Only. ';
  }
  creditCardMessage = numberDigit + 'Please enter numbers between 13 and 16.';
  return creditCardMessage;
}

//Zip field------------------------------

//The zipcode field should accept a 5-digit number
function isZipCodeValid () {
  return $zip.val().length === 5 && $.isNumeric($zip.val());
}
function zipCodeEvent () {
  if (!isZipCodeValid()) {
    showErrorMessage ($zip, messageZip, $zip, 'zipError');
  } else {
    removeErrorMessage($zip, '#zipError');
  }
}
validateKeyup ($zip, '#zipError', zipCodeEvent);

//CVV field------------------------------

//The CVV should only accept a number that is exactly 3 digits long
function isCVVValid () {
   return $cvv.val().length === 3 && $.isNumeric($cvv.val());
}
function CVVEvent () {
  if (!isCVVValid()) {
    showErrorMessage ($cvv, messageCVV, $cvv, 'CVVError');
   } else {
    removeErrorMessage($cvv, '#CVVError');
  }
}
validateKeyup ($cvv, '#CVVError', CVVEvent);

//submit functions-------------------------

//validate only these fields while cc div is hidden
function canSubmitCreditCardHidden () {
  return isNameValid () && isEmailValid() && isOneActivitySelected();
}
//validate all fields if cc div is visible
function canSubmitCreditCardVisible () {
  return isNameValid () && isEmailValid() && isOneActivitySelected() && isCreditCardValid() && isZipCodeValid() && isCVVValid();
}

//Submit if cc is visible
function enableSubmit1 () {
    $('.error').remove();//remove old errors to prevent duplicates
      if (!canSubmitCreditCardVisible()) {
        event.preventDefault();
        nameEvent();
        emailEvent();
        activitiesCheckedEvent();
        creditCardNumberEvent();
        zipCodeEvent ();
        CVVEvent ();
      } else {
        alert('You sucessfully registered. Enjoy!')
      }
  }
//submit if cc is hidden
function enableSubmit2 () {
    $('.error').remove();
      if (!canSubmitCreditCardHidden()) {
        event.preventDefault();
        nameEvent();
        emailEvent();
        activitiesCheckedEvent();
      } else {
        alert('You sucessfully registered. Enjoy!')
      }
  }
//submit
$('#submit').click(function(event){
    if ($('#credit-card').css('display')!=='none') {
      enableSubmit1();
    } else {
      enableSubmit2();
    }
});
