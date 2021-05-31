var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WaitSchema = new Schema(
    {
        first_name: {type: String, required: [true, 'First name required']},
        last_name: {type: String, required: [true, 'Last name required']},
        party_num: {type: Number, min: 1, required: [true, 'Number of people required']},
        seating: {
            type: String,
            default: 'Patio (No Preference for Front or Back)'
        },
        has_cell: {
            type: String
        },
        cell_num: {
            type: String,
            required: [true, 'Phone number required']
        },
        status: {
            type: String,
            required: true,
            enum: ['Waiting', 'Notified', 'Confirmed', 'Archived', 'Removed'],
            default: 'Waiting'
        },
        position: {type: Number, min: 1},
        notify_total: {type: Number, required: true, default: 0}, 
        wait_end: {type: Date},
        removedAt: {type: Date}

    },
    {timestamps: {createdAt: true, updatedAt: false}}
);

// Virtual for customer's full name
WaitSchema
.virtual('name')
.get(function() {
    return this.first_name + ' ' + this.last_name;
});

// Virtual for customer's local wait start time
WaitSchema
.virtual('waitStart_localTime')
.get(function() {
    var sixhour_adjust_start = new Date(this.createdAt.getTime() - 21600000).toTimeString().substring(0,5);
    return `${sixhour_adjust_start} (24H)`
});

// Virtual for customer's local wait end time
WaitSchema
.virtual('waitEnd_localTime')
.get(function() {
    var sixhour_adjust_end = new Date(this.wait_end.getTime() - 21600000).toTimeString().substring(0,5);
    return `${sixhour_adjust_end} (24H)`
});

// Virtual for customer's wait_duration
WaitSchema
.virtual('wait_duration')
.get(function() {
    return (Math.round((Date.now() - this.createdAt.getTime())/60000)).toString();
});

// Virtual for customer's wait_completed
WaitSchema
.virtual('wait_completed')
.get(function() {
    return (Math.round((this.wait_end.getTime() - this.createdAt.getTime())/60000)).toString();
});

// Virtual for wait's URL for guests to see position
WaitSchema
.virtual('urlPosition')
.get(function() {
    return '/waitlist/guest/' + this._id + '/position';
});

// Virtual for wait's URL for guests to update
WaitSchema
.virtual('urlGuestUpdate')
.get(function() {
    return '/waitlist/guest/' + this._id + '/update';
});

// Virtual for wait's URL for guests to remove themselves from the Waitlist
WaitSchema
.virtual('urlGuestRemove')
.get(function() {
    return '/waitlist/guest/' + this._id + '/remove';
});

// Virtual for wait's URL for staff
WaitSchema
.virtual('urlDetails')
.get(function() {
    return '/waitlist/session/' + this._id;
});

// Export model
module.exports = mongoose.model('Wait', WaitSchema);
