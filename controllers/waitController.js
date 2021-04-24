var Wait = require('../models/wait');
var async = require('async');
const {body,validationResult} = require('express-validator');
require('dotenv').config();


// Amazon SNS
// Import required AWS SDK clients and commands for Node.js
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

// Set the AWS Region
const REGION = "ca-central-1";

// Create SNS service object
const sns = new SNSClient({ region: REGION });

// Display index page
exports.faq = function(req, res) {
    res.render('waitlist/faq');
};

// Display list of all waits
exports.wait_list_all = function(req, res, next) {

    async.parallel({
        waits_waitCount: function(callback) {
            Wait.countDocuments({ status: 'Waiting'})
                .exec(callback)
        },
        waits_notifiedCount: function(callback) {
            Wait.countDocuments({ status: 'Notified'})
                .exec(callback)
        },
        waits_confirmedCount: function(callback) {
            Wait.countDocuments({ status: 'Confirmed'})
                .exec(callback)
        },
        waits_all: function(callback) {
            Wait.find({status: {$nin: ['Archived', 'Removed']}})
                .sort([['createdAt', 1]])
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage
        // Success, so render
        res.render('waitlist/waits_all', {title: 'Active Sessions', waits_waitCount: results.waits_waitCount, waits_notifiedCount: results.waits_notifiedCount, waits_confirmedCount: results.waits_confirmedCount, waits_all: results.waits_all});
    });
};

// Display list of 'waiting' waits
exports.wait_list_waiting = function(req, res, next) {

    async.parallel({
        waits_waitCount: function(callback) {
            Wait.countDocuments({ status: 'Waiting'})
                .exec(callback)
        },
        waits_waiting: function(callback) {
            Wait.find({ status: 'Waiting' })
                .sort([['createdAt'], ['first_name']])
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage
        // Success, so render
        res.render('waitlist/waits_waiting', {title: "'Waiting' Sessions", waits_waitCount: results.waits_waitCount, waits_waiting: results.waits_waiting});
    });
};

// Display list of 'notified' waits
exports.wait_list_notified = function(req, res, next) {

    async.parallel({
        waits_notifiedCount: function(callback) {
            Wait.countDocuments({ status: 'Notified' })
                .exec(callback)
        },
        waits_notified: function(callback) {
            Wait.find({ status: 'Notified' })
                .sort([['wait_end', 1], ['first_name']])
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage
        // Success, so render
        res.render('waitlist/waits_notified', {title: "'Notified' Sessions", waits_notifiedCount: results.waits_notifiedCount, waits_notified: results.waits_notified});
    });
};

// Display list of 'confirmed' waits
exports.wait_list_confirmed = function(req, res, next) {

    async.parallel({
        waits_confirmedCount: function(callback) {
            Wait.countDocuments({ status: 'Confirmed' })
                .exec(callback)
        },
        waits_confirmed: function(callback) {
            Wait.find({ status: 'Confirmed' })
                .sort([['wait_end', 1], ['first_name']])
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err);} // Error in API usage
        // Success, so render
        res.render('waitlist/waits_confirmed', {title: "'Confirmed' Sessions", waits_confirmedCount: results.waits_confirmedCount, waits_confirmed: results.waits_confirmed});
    });
};

// Display list of 'archived' waits
exports.wait_list_archived = function(req, res, next) {

    async.parallel({
        waits_archivedCount: function(callback) {
            Wait.countDocuments({ status: 'Archived' })
                .exec(callback)
        },
        waits_archived: function(callback) {
            var d = new Date();
            var timeMidnightEdmonton = d.setHours(-6,0,0);
            Wait.find({ status: 'Archived' , createdAt: { $gt: timeMidnightEdmonton }})
                .sort([['createdAt', -1], ['first_name']])
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err);} // Error in API usage
        // Success, so render
        res.render('waitlist/waits_archived', {title: "'Archived' Sessions", waits_archivedCount: results.waits_archivedCount, waits_archived: results.waits_archived});
    });
};

// Display detail page for a specific Wait
exports.wait_detail = function(req, res, next) {

    async.parallel({
        wait: function(callback) {
            Wait.findById(req.params.id)
            .exec(callback)
        },
        waitStartArray: function(callback) {
            Wait.find({status: 'Waiting'}, '_id createdAt')
                .sort([['createdAt']])
                .exec(callback)
        },
        waitingCount: function(callback) {
            Wait.countDocuments({status: 'Waiting'})
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage
        // Success, so render
        res.render('waitlist/wait_detail', {title: 'Session Details', wait: results.wait, waitStartArray: results.waitStartArray, waitingCount: results.waitingCount});
    });
};

// Display position-in-line page for a specific Wait
exports.wait_position = function(req, res, next) {

    async.parallel({
        wait: function(callback) {
            Wait.findById(req.params.id)
            .exec(callback)
        },
        waitStartArray: function(callback) {
            Wait.find({status: 'Waiting'}, '_id createdAt')
                .sort([['createdAt']])
                .exec(callback)
        },
        waitingCount: function(callback) {
            Wait.countDocuments({status: 'Waiting'})
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage
        // Success, so render
        res.render('waitlist/wait_position', {title: 'Sugarbowl Waitlist', wait: results.wait, waitStartArray: results.waitStartArray, waitingCount: results.waitingCount});
    });

};

// Display Wait create form on GET (by STAFF)
exports.wait_create_get = function(req, res, next) {
        res.render('waitlist/wait_form');
};

// Display Wait create on POST (by STAFF)
exports.wait_create_post = [
    // Validate and sanitise fields
    body('first_name').trim().isLength({min:1}).escape().withMessage('First name required.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').trim().isLength({min:1}).escape().withMessage('Last name or initial is required')
        .withMessage('Last name has non-alphanumeric characters.'),
    body('party_num', 'Number of people required').trim().escape(),
    body('seating').escape(),
    body('has_cell').escape(),
    body('cell_num', 'Phone number required').trim().escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            res.render('waitlist/wait_form', {title: "Join Sugarbowl's Waitlist", wait: req.body, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid

            // Create a Wait object with escaped and trimmed data.
            var wait = new Wait(
                {   
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    party_num: req.body.party_num,
                    seating: req.body.seating,
                    has_cell: req.body.has_cell,
                    cell_num: req.body.cell_num
                });
            wait.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new wait record
                res.redirect(wait.urlDetails);

                async.parallel({
                    waitStartArray: function(callback) {
                        Wait.find({status: 'Waiting'}, '_id createdAt')
                            .sort([['createdAt']])
                            .exec(callback)
                    },
                    waitingCount: function(callback) {
                        Wait.countDocuments({status: 'Waiting'})
                            .exec(callback)
                    },
                }, function(err, results) {
                    if (err) { return next(err); } // Error in API usage
                    // Success
                    var waitStartArray = results.waitStartArray;
                    var waitingCount = results.waitingCount;
                    
                    for (var i = 0; i < waitStartArray.length; i++)
                        if (waitStartArray[i]['_id'] == wait['_id']) {var position = parseInt(i);}
                    
                    // Add position in line
                    Wait.findByIdAndUpdate(wait._id, {$set:{position:i}}, {new:true}, function(err, results) {
                        if (err) {return next(err);}
                    });
                
                    // Because of the cost of SMS, only 1 SMS will be sent to the Guest (notifying them to come in)
                    // // Send Guest SMS
                    // var name = session.first_name;
                    // var cell_num = session.cell_num;

                    // // Set the parameters
                    // const params = {
                    //     Message: `Hi ${name}! This is Sugarbowl. You are ${i} of ${waitingCount} in line. We will text you again to come in!` /* required */,
                    //     PhoneNumber: `+1${cell_num}` //PHONE_NUMBER, in the E.164 phone number structure
                    // };

                    // const run = async () => {
                    //     try {
                    //       const data = await sns.send(new PublishCommand(params));
                    //     //   console.log("Success, message published. MessageID is " + data.MessageId);
                    //     } catch (err) {
                    //       console.error(err, err.stack);
                    //     }
                    // };
                    // run();
                });
            });
        }
    }
];

// Display Wait create form on GET (FOR GUEST)
exports.wait_create_get_guest = function(req, res, next) {
    res.render('waitlist/wait_form_guest', {title: "Join Sugarbowl's Waitlist"});
};

// Display Wait create on POST (FOR GUEST)
exports.wait_create_post_guest = [
    // Validate and sanitise fields
    body('first_name').trim().isLength({min:1}).escape().withMessage('First name required.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').trim().isLength({min:1}).escape().withMessage('Last name or initial is required')
        .withMessage('Last name has non-alphanumeric characters.'),
    body('party_num', 'Number of people required').trim().escape(),
    body('seating').escape(),
    body('cell_num', 'Phone number required').trim().escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            res.render('waitlist/wait_form_guest', {title: "Join Sugarbowl's Waitlist", wait: req.body, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid

            // Create a Wait object with escaped and trimmed data.
            var wait = new Wait(
                {   
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    party_num: req.body.party_num,
                    seating: req.body.seating,
                    cell_num: req.body.cell_num
                });
            wait.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new wait record
                res.redirect(wait.urlPosition);

                async.parallel({
                    waitStartArray: function(callback) {
                        Wait.find({status: 'Waiting'}, '_id createdAt')
                            .sort([['createdAt']])
                            .exec(callback)
                    },
                    waitingCount: function(callback) {
                        Wait.countDocuments({status: 'Waiting'})
                            .exec(callback)
                    },
                }, function(err, results) {
                    if (err) { return next(err); } // Error in API usage
                    // Success
                    var waitStartArray = results.waitStartArray;
                    var waitingCount = results.waitingCount;
                    
                    for (var i = 0; i < waitStartArray.length; i++)
                        if (waitStartArray[i]['_id'] == wait['_id']) {var position = parseInt(i);}
                    
                    // Add position in line
                    Wait.findByIdAndUpdate(wait._id, {$set:{position:i}}, {new:true}, function(err, results) {
                        if (err) {return next(err);}
                    });
                
                    // Because of AWS SNS cost, only 1 SMS will be sent to Guest, asking them to come in to the restaurant.
                    // // Send Guest SMS & Email
                    // var name = session.first_name;
                    // var cell_num = session.cell_num;
  
                    // // Set the parameters
                    // const params = {
                    //     Message: `Hi ${name}! This is Sugarbowl. You are ${i} of ${waitingCount} in line. We will text you again to come in!` /* required */,
                    //     PhoneNumber: `+1${cell_num}` //PHONE_NUMBER, in the E.164 phone number structure
                    // };

                    // const run = async () => {
                    //     try {
                    //         const data = await sns.send(new PublishCommand(params));
                    //         // console.log("Success, message published. MessageID is " + data.MessageId);
                    //     } catch (err) {
                    //         console.error(err, err.stack);
                    //     }
                    // };
                    // run();
                });
            });
        }
    }
];

// Display Wait delete form on GET
exports.wait_delete_get = function(req, res, next) {
    Wait.findById(req.params.id, function(err, wait) {
        if (err) {return next(err);}
        if (wait==null) { // No results
            res.redirect('/waitlist/sessions/waiting');
        }
        // Successful, so render
        res.render('waitlist/wait_delete', { title: 'Delete Session', wait: wait });
    });
};

// Display Wait delete on POST
exports.wait_delete_post = function(req, res, next) {
    Wait.findById(req.body.waitId, function(err, results) {
        if (err) { return next(err); }
        // Success
        Wait.findByIdAndRemove(req.body.waitId, function deleteWait(err) {
            if (err) { return next(err); }
            // Success - go to waits list
            res.redirect('/waitlist/sessions/waiting')
        });
    });
};

// Display Wait delete form on GET (GUEST)
exports.wait_delete_guest_get = function(req, res, next) {
    Wait.findById(req.params.id, function(err, wait) {
        if (err) {return next(err);}
        if (wait==null) { // No results
            res.redirect('/waitlist/guest/create');
        }
        // Successful, so render
        res.render('waitlist/wait_delete_guest', { title: 'Leave The Waitlist', wait: wait });
    });
};

// Display Wait delete on POST (GUEST)
exports.wait_delete_guest_post = function(req, res, next) {
    Wait.findByIdAndUpdate(req.body.waitId, 
        {status: 'Removed', removedAt: new Date()}, 
        {new: true}, 
        function (err, results) {
            if (err) { return next(err); }
            else {
                res.redirect('/waitlist/guest/create');
            }
        }
    );
};

// Display Wait update form on GET
exports.wait_update_get = function(req, res, next) {
    // Get wait for form
    Wait.findById(req.params.id, function(err, wait) {
        if (err) { return next(err); }
        if (wait == null) { // No results.
            var err = new Error('Session not found');
            err.status = 404;
            return next(err);
        }
        // Success
        res.render('waitlist/wait_form', {title: 'Update Session', wait: wait});
    });
};

// Display Wait update on POST
exports.wait_update_post = [
    // Validate and sanitize fields
    body('first_name').trim().isLength({min:1}).escape().withMessage('First name required.'),
    body('last_name').trim().isLength({min:1}).escape().withMessage('Last name or initial is required'),
    body('party_num', 'Number of people required').trim().escape(),
    body('seating').escape(),
    body('cell_num', 'Phone number required').trim().escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        
        // Extract the validation errors from a request
        const errors = validationResult(req);

        // Create a Wait object with escaped/trimmed data and old id
        var wait = new Wait(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                party_num: req.body.party_num,
                seating: req.body.seating,
                cell_num: req.body.cell_num,
                _id: req.params.id // This is required, or a new ID will be assigned!
            }
        );
        
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('wailist/wait_form', {title: 'Update Session', wait: wait, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Wait.findByIdAndUpdate(req.params.id, wait, {}, function (err, wait) {
                if (err) { return next(err); }
                // Successful - redirect to wait detail page
                res.redirect(wait.urlDetails);
            });
        }   
    }
];

// Display Wait update form on GET (GUEST)
exports.wait_update_get_guest = function(req, res, next) {
    // Get wait for form
    Wait.findById(req.params.id, function(err, wait) {
        if (err) { return next(err); }
        if (wait == null) { // No results.
            var err = new Error('Session not found');
            err.status = 404;
            return next(err);
        }
        // Success
        res.render('waitlist/wait_form_guest', {title: 'Update Session', wait: wait});
    });
};

// Display Wait update on POST (FOR GUEST)
exports.wait_update_post_guest = [
    // Validate and sanitize fields
    body('first_name').trim().isLength({min:1}).escape().withMessage('First name required.'),
    body('last_name').trim().isLength({min:1}).escape().withMessage('Last name or initial is required'),
    body('party_num', 'Number of people required').trim().escape(),
    body('seating').escape(),
    body('cell_num', 'Phone number required').trim().escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        
        // Extract the validation errors from a request
        const errors = validationResult(req);

        // Create a Wait object with escaped/trimmed data and old id
        var wait = new Wait(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                party_num: req.body.party_num,
                seating: req.body.seating,
                cell_num: req.body.cell_num,
                _id: req.params.id // This is required, or a new ID will be assigned!
            }
        );
        
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('waitlist/wait_form_guest', {title: 'Update Session', wait: wait, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Wait.findByIdAndUpdate(req.params.id, wait, {}, function (err, wait) {
                if (err) { return next(err); }
                // Successful - redirect to wait detail page
                res.redirect(wait.urlPosition);
            });
        }   
    }
];

// Display Session notify form on GET
// exports.session_notify_get = function(req, res, next) {
//     // Get session for form
//     Session.findById(req.params.id, function(err, session) {
//         if (err) { return next(err); }
//         if (session == null) { // No results.
//             var err = new Error('Session not found');
//             err.status = 404;
//             return next(err);
//         }
//         // Success
//         res.render('session_notify_waitEnd', {title: "Notify Guest", session: session});
//     });
// };

// Display Wait notify on POST
exports.wait_notify_post = function(req, res, next) {
    if (req.body.notifyGuest == 'true') {
        // Get wait
        Wait.findById(req.params.id, function(err, wait) {
            if (err) { return next(err); }
            if (wait == null) { // No results.
                var err = new Error('Session not found');
                err.status = 404;
                return next(err);
            }
            // Success - send guest SMS and Email
            var name = wait.first_name;
            var cell_num = wait.cell_num;

            // Set the parameters
            const params = {
                Message: ` Hi ${name}! This is Sugarbowl. We have a table for you! Please come in.` /* required */,
                PhoneNumber: `+1${cell_num}` //PHONE_NUMBER, in the E.164 phone number structure
            };

            const run = async () => {
                try {
                    const data = await sns.send(new PublishCommand(params));

                    // Update the record
                    var notify_total = wait.notify_total;
                    // console.log(notify_total);
                    notify_total = ++notify_total;
                    // console.log(notify_total);

                    if (wait.wait_end) {
                        var first_waitEnd = wait.wait_end
                    } else {
                        first_waitEnd = new Date();
                    }

                    Wait.findByIdAndUpdate(req.params.id, 
                        {status: 'Notified', wait_end: first_waitEnd, notify_total: notify_total}, 
                        {new: true}, 
                        function (err, results) {
                            if (err) { return next(err); }
                            else {
                                res.render('waitlist/successful_sms', {title: 'Notification Attempted', response: data.MessageId, results:results});
                            
                                // console.log(`Session for ${results.name} was updated:`);
                                // console.log(`status: ${results.status}`);
                                // console.log(`wait_end: ${results.wait_end}`);
                            }
                        }
                    );
                    // console.log("Success, message published. MessageID is " + data.MessageId);
                } catch (err) {
                    console.error(err, err.stack);
                }
            };
            run();

        });
    };
};

// Already phoned Guest on GET
exports.wait_phonedGuest_get = function(req, res, next) {
    // Get wait for form
    Wait.findById(req.params.id, function(err, wait) {
        if (err) { return next(err); }
        if (wait == null) { // No results.
            var err = new Error('Session not found');
            err.status = 404;
            return next(err);
        }
        // Success
        res.render('waitlist/wait_notify_phoned', {title: "Transfer Guest?", wait: wait});
    });
};

// Already phoned Guest on POST
exports.wait_phonedGuest_post = function(req, res, next) {
    if (req.body.phonedGuest == 'true') {
        Wait.findById(req.params.id, function(err, wait) {
            if (err) { return next(err); }
            if (wait == null) { // No results.
                var err = new Error('Session not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so...
            // Update the record
            var notify_total = wait.notify_total;
            // console.log(notify_total);
            notify_total = ++notify_total;
            // console.log(notify_total);

            if (wait.wait_end) {
                var first_waitEnd = wait.wait_end
            } else {
                first_waitEnd = new Date();
            }

            Wait.findByIdAndUpdate(req.params.id, {status: 'Notified', wait_end: first_waitEnd, notify_total: notify_total}, {new: true},
                function (err, wait) {
                    if (err) {return next(err);}
                    else {
                        res.redirect('/waitlist/sessions/waiting');
                    }
                }
            );
        });
    }
};

// Archive request for Confirmed Waits on GET
exports.wait_archiveRequestConfirmed_get = function(req, res, next) {
    res.render('waitlist/waits_archive_request_confirmed', {title: 'Archive Sessions Request'})
};

// Archive request for Confirmed Waits on POST
exports.wait_archiveRequestConfirmed_post = function(req, res, next) {
    var date_iso = new Date(Date.now() - 3600000).toISOString() // Minus 1h in milliseconds; is date 1h ago in msec

    if (req.body.archiveWaits == 'true') {
        Wait.updateMany({status: 'Confirmed', wait_end: { $lt: date_iso }}, {status: 'Archived'}, {new: true},
            function (err, results) {
                if (err) {return next(err);}
                else {
                    res.redirect('/waitlist/sessions/confirmed');
                }
            }
        );
    }
    
};

// Archive request for Notified Waits on GET
exports.wait_archiveRequest_get = function(req, res, next) {
    res.render('waitlist/waits_archive_request', {title: 'Archive Sessions Request'})
};

// Archive request for Notified Waits on POST
exports.wait_archiveRequest_post = function(req, res, next) {
    var date_iso = new Date(Date.now() - 3600000).toISOString() // Minus 1h in milliseconds; is date 1h ago in msec

    if (req.body.archiveWaits == 'true') {
        Wait.updateMany({status: 'Notified', wait_end: { $lt: date_iso }}, {status: 'Archived'}, {new: true},
            function (err, results) {
                if (err) {return next(err);}
                else {
                    res.redirect('/waitlist/sessions/notified');
                }
            }
        );
    }
    
};

// Archive request for Waiting Waits on GET
exports.wait_archiveRequestWaiting_get = function(req, res) {
    res.render('waitlist/waits_archive_request_waiting', {title: 'Archive Sessions Request'})
};

// Archive request for Waiting Waits on POST
exports.wait_archiveRequestWaiting_post = function(req, res, next) {
    var date_iso = new Date(Date.now() - 7200000).toISOString() // Minus 2h in milliseconds; is date 2h ago in msec

    if (req.body.archiveWaits == 'true') {
        Wait.updateMany({status: 'Waiting', createdAt: { $lt: date_iso }}, {status: 'Archived'}, {new: true},
            function (err, results) {
                if (err) {return next(err);}
                else {
                    res.redirect('/waitlist/sessions/waiting');
                }
            }
        );
    }
    
};

// Notify ALL request for Waiting Waits on GET
// exports.wait_notifyAll_get = function(req, res) {
//     res.render('waitlist/notify_all_request', {title: "Notify ALL Request"})
// };

// Notify ALL request for Waiting Waits on POST
// exports.wait_notifyAll_post = function(req, res, next) {
//     if (req.body.notifyAll == 'true') {

//         Wait.updateMany({status: 'Waiting'}, {status: 'Notified', wait_end: new Date(), notify_total: 1}, {new: true},
//             function (err, results) {
//                 if (err) {return next(err);}
//                 else {
//                     res.redirect('/waitlist/sessions/waiting');
//                 }
//             }
//         );
        
//     }
// };

// Confirming a wait on POST
exports.wait_confirm_post = function(req, res, next) {

    if (req.body.confirmWait == 'true') {
        Wait.findByIdAndUpdate(req.params.id, {status: 'Confirmed'}, {new: true},
            function (err, wait) {
                if (err) {return next(err);}
                else {
                    res.redirect(wait.urlPosition);
                }
            }
        );
    }
    
};