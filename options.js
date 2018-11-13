$(function () {

    chrome.storage.sync.get('limit', function (budget) {
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(function () {
        var limit = $('#limit').val();
        if (limit) {
            chrome.storage.sync.set({
                'limit': limit
            }, function () {
                close();
            });
        }
    });
    // We use 'saveLimit' id to activate click event and after that we take the value of entered amount
    // If value for limit is entered we activate chrome stogare and add value to it 
    // After adding value we close that tab


    $('#resetTotal').click(function () {
        chrome.storage.sync.set({
            'total': 0
        }, function () {

            var notifOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Resetting Total Value",
                message: "You reseted value of spent money to 0."
            };
            chrome.notifications.create('resetNotif', notifOptions);
        });
    });
});
// This is a way of creating object that output the notification when total value is reseted to 0