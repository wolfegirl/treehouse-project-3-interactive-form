//1. set focus on first text field when page loads
const $name = $('#name').focus();

//2.Reveal job role div if "other" is selected.

//hiding other job role div
$('.otherJobRoleDiv').hide();
//disabling the select color field instead of hiding. Leaving this as a comment (exceeds requires hiding but I wanted to do both - disabling/hiding)
//$('#color').prop('disabled', 'disabled');

function toggleOtherJobRole() {
    $('#title').change(function() {
      //$('.otherJobRoleDiv').toggle(this.value == 'other'); this is a way to do it without the animation - but the animation is cool
    if(this.value === 'other') {
      $('.otherJobRoleDiv').toggle('slow');
    } else {
      $('.otherJobRoleDiv').hide('slow');
    }
  });
}
toggleOtherJobRole();

//3. display the color options that match the design selected in the "Design" menu.

function toggleTshirtSelection () {
  const $designSelection = $('#design');
  const $colorSelection = $('#color');

  $designSelection.change(function() {

    if (this.value === 'js puns') {
      //$colorSelection.empty().prop('disabled', false); //this is to disable

      $('.colors-js-puns').css('display', 'block');
      $colorSelection.empty().append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
    } else if (this.value === 'heart js') {
      //$colorSelection.empty().prop('disabled', false); //this is to disable rather than hide

      $('.colors-js-puns').css('display', 'block');
      $colorSelection.empty().append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
     } else if (this.value === 'select theme') {
       //$('#color').prop('disabled', 'disabled'); to disable rather than hide
       $('.colors-js-puns').css('display', 'none');
    }
  });
}
toggleTshirtSelection();

//4. Register for Activities section -------------------------

const $activities = $('.activities');
//a function to toggle conflicting activities passing in each id name
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

//As a user selects activities, a running total should display below the list of checkboxes

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
      }
      else {
      $runningTotalFieldset.hide();
      }
  });
}
register ();
//5. Payment info section -----------------------------------

//Display payment sections based on the payment option chosen in the select menu


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
//6. Form validation ---------------------------------------

const messageName = 'Please enter a name.';
const messageEmail = 'Please enter a valid email.';
const messageCheckbox = 'Please check an activity.';
const messageCreditCardNumber = 'Please enter a valid credit-card number';
const messageCreditCardNumberLength = 'Please enter a cc number that is between 13 and 16 digits long';
const messageZip = '5 digits please.';
const messageCVV = '3 digits please';

let valid = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
let $nameValue = $('#name');
let $emailValue = $('#mail');
let $activitiesChecked = $('.activities input:checked');
let $cardNumber = $('#cc-num');
let $zip = $('#zip');
let $cvv = $('#cvv');
//global variable to insert errors after corresponding div
let $errors = $('<div class="error"></div>');

//function to insert errors passing in corresponding arguments to div
function errorMessage (divID, message, DIVSelector) {
  let $errorDiv = $errors.insertAfter(divID);
  $('.error').append().html(message);
  DIVSelector.css('border-color', 'red');
  $errors.show();
}
function removeErrorMessage (errorDiv) {
  errorDiv.css('border-color', '#5e97b0');
  $errors.hide();
}
//This is a working fix for a little bug: if .error is shown, on keyup on another input, .error hides
function fixErrorBug () {

}

//test name input is not empty
function isNameValid () {
  return $nameValue.val().length > 0;
}

function nameEvent () {
  if (!isNameValid()) {
    errorMessage ($nameValue, messageName, $nameValue);
  } else {
    removeErrorMessage ($nameValue);
    }
  }


//validate email
function isEmailValid () {
  if (valid.test($emailValue.val()) == true) {
    return true;
  } else {
    return false;
  }
}
function emailEvent () {
  if (!isEmailValid()) {
    errorMessage ($emailValue, messageEmail, $emailValue);
  } else {
    removeErrorMessage ($emailValue);
    }
}

//Make sure at lease one checkbox is checked - not working - if this is uncommented, the submit button will stay at "disabled"
// function isOneActivitySelected () {
//   return $activitiesChecked.length > 0;
//   console.log($activitiesChecked.length);
// }
// function activitiesCheckedEvent () {
//     if (!isOneActivitySelected()) {
//       errorMessage ('.activities', messageCheckbox, $activitiesChecked);
//     } else {
//       $errors.hide();
//     }
// }

//Credit card field should only accept a number between 13 and 16 digits
function isCreditCardValid () {
return $cardNumber.val().length >= 13 && $cardNumber.val().length <= 16;
}

function CreditCardNumberEvent () {
  if (!isCreditCardValid()) {
    errorMessage ($cardNumber, messageCreditCardNumber, $cardNumber);
  } else {
    removeErrorMessage($cardNumber);
  }
}

//The zipcode field should accept a 5-digit number
function isZipCodeValid () {
  return $zip.val().length === 5;
}
function zipCodeEvent () {
  if (!isZipCodeValid()) {
    errorMessage ($zip, messageZip, $zip);
  } else {
      removeErrorMessage($zip);
  }
}

//The CVV should only accept a number that is exactly 3 digits long
function isCVVValid () {
  return $cvv.val().length === 3;
}
function CVVEvent () {
  if (!isCVVValid()) {
    errorMessage ($cvv, messageCVV, $cvv);
  } else {
    removeErrorMessage($cvv);
  }
}

function canSubmit () {
  //if cc card is not selected
  if ($('#payment') === 'paypal' || $('#payment') === 'bitcoin' ) {
      return isNameValid () &&
      isEmailValid();
      //&& isOneActivitySelected(); - not working
  //if cc card is selected
  } else {
      return
      isNameValid () &&
      isEmailValid() &&
      isCreditCardValid() &&
      isZipCodeValid() &&
      isCVVValid();
      //isOneActivitySelected() - not working
  }
}
function enableSubmit () {
  $('#submit').prop('disabled', !canSubmit ());
}
$nameValue.keyup(nameEvent).keyup(enableSubmit);
$emailValue.keyup(emailEvent).keyup(enableSubmit);
//$activitiesChecked.click(activitiesCheckedEvent).click(enableSubmit); - not working
$cardNumber.keyup(CreditCardNumberEvent).keyup(enableSubmit);
$zip.keyup(zipCodeEvent).keyup(enableSubmit);
$cvv.keyup(CVVEvent).keyup(enableSubmit);

enableSubmit();



//exceeds --------------------------------
//Real time validation for at least one field - done

//Program at least one of your error messages so that more information is provided depending on the error. For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads “Please enter a number that is at least 16 digits long.” - to do