'use strict';
const _ = require('lodash');
const db = require('../datalayer/history');
const connection = require('./connection');
const states = require('../datalayer/states');

function structureStudents(data) {
    return data.reduce((acc, cur) => {
        if (acc.hasOwnProperty(cur.full_name)) {
            acc[cur.full_name].push(cur);
        } else {
            acc[cur.full_name] = [cur];
        }
        return acc;
    }, {});
}

function correctSundays(sundays, data, running_module_id) {
    data.push(...generateStudents(sundays, data, running_module_id));
    const attendances = [];
    for (let attendance of data) {
        let datesAreInModules = sundays.some(date => date === attendance.date);
        if (datesAreInModules) {
            attendances.push(attendance);
        }
    }
    return attendances;
}

function getHistory(req, res) {
    const running_module_id = req.params.moduleId;
    const groupId = req.params.groupId;
    const sundays = req.body.sundays;
    connection.getConnection(req, res)
        .then(con => db.getHistory(con, running_module_id))
        .then(data => {
            if (data.length < 1) {
                return connection.getConnection(req, res)
                    .then(con => states.getStudentsState(con, groupId))
                    .then(students => {
                        students = correctSundays(sundays, students, running_module_id);
                        const result = structureStudents(students);
                        res.json(result);
                    })
            }
            if (sundays) {
                data = correctSundays(sundays, data);
            }
            const result = structureStudents(data);
            res.json(result);
        })
        .catch(err => console.error(err));
}


function orderAndGetList(histories) {
    const list = [];
    let arr = [];
    for (const key in histories) {
        for (const history of histories[key]) {
            const [date, group_id, running_module_id, user_id, attendance, homework] =
                [history.date, history.group_id, history.running_module_id, history.user_id, history.attendance, history.homework];
            arr.push(date, group_id, running_module_id, user_id, attendance, homework);
            list.push(arr);
            arr = [];
        }
    }
    return list;
}

function saveAttendances(req, res) {
    connection.getConnection(req, res)
        .then(con => {
            const list = orderAndGetList(req.body);
            return db.saveHistory(con, list)
                .then(val => {
                    res.status(200).json(val);
                });
        })
        .catch(err => {
            console.log('err: ', err);
            res.status(400).json(err);
        });
}

function generateStudents(dates, attendances, running_module_id) {
    console.log(running_module_id)
    const studentsList = [];
    for (let attendance of attendances) {
        for (let date of dates) {
            if (date !== attendance.date) {
                const newAttendance = Object.assign({}, attendance);
                [newAttendance.attendance, newAttendance.homework, newAttendance.date, newAttendance.running_module_id] = [0, 0, date, running_module_id || attendance.running_module_id];
                studentsList.push(newAttendance);
            }
        }
    }
    // TODO: Chaneg username to full_name when merged to master
    return studentsList;
}

module.exports = {
    getHistory,
    saveAttendances
};