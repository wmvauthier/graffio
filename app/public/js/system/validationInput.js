$(document).ready(function () {
    $('.validationInput_Value').mask('0ZZZZZZZ.00', { translation: { 'Z': { pattern: /[0-9]/, optional: true } } });
    $('.validationInput_IP').mask('0ZZ.0ZZ.0ZZ.0ZZ', { translation: { 'Z': { pattern: /[0-9]/, optional: true } } });
    $('.validationInput_Cellphone').mask('(00) 0000-0000', { translation: { 'Z': { pattern: /[0-9]/, optional: true } } });
    $('.validationInput_CPF').mask('000.000.000-00');
    $('.validationInput_CNPJ').mask('00.000.000/0000-00');
    $('.validationInput_Date').mask('00/00/0000');
});