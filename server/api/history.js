'use strict';
const _ = require('lodash');
const db = require('../datalayer/history');
const connection = require('./connection');

function getHistory(req, res) {
    const running_module_id = req.params.id;
    const sundays = req.body.sundays;
    connection.getConnection(req, res)
        .then(con => db.getHistory(con, running_module_id))
        .then(data => {
            if (data.length < 1) return res.status(204).json(data);
            if (sundays) {
                data.push(...generateStudents(sundays, data));
                const attendances=[];
                for (let attendance of data) {
                    let datesAreInModules = sundays.some(date => date === attendance.date);
                    if(datesAreInModules){
                        attendances.push(attendance);
                    }
                }
                data = attendances;
            }
            const result = data.reduce((acc, cur) => {
                if (acc.hasOwnProperty(cur.full_name)) {
                    acc[cur.full_name].push(cur);
                } else {
                    acc[cur.full_name] = [cur];
                }
                return acc;
            }, {});
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

function generateStudents(dates, attendances) {
    const studentsList = [];
    for (let attendance of attendances) {
        for (let date of dates) {
            if (date !== attendance.date) {
                const newAttendance = Object.assign({}, attendance);
                [newAttendance.attendance, newAttendance.homework, newAttendance.date] = [0, 0, date];
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