(function () {
    'use strict';

    var serviceId = 'querydatacontext';
    angular.module('app').factory(serviceId, ['common', querydatacontext]);

    function querydatacontext(common) {
        var $q = common.$q;
        var service = {
            CreateQuestion: CreateQuestion,
            uploadFile: uploadFile,
            GetQuestionsforExpert: GetQuestionsforExpert,
            GetQuestionsforUser: GetQuestionsforUser,
            GetFollowupsforExpert: GetFollowupsforExpert,
            GetFollowUpForQuestion: GetFollowUpForQuestion,
            GetQuestion: GetQuestion,
            UpdateQuestion: UpdateQuestion,
            CreateFollowup: CreateFollowup,
            UpdateFollowup: UpdateFollowup,
            GetQuestionsHistoryforExpert: GetQuestionsHistoryforExpert,
            GetFollowupsforUser: GetFollowupsforUser
        };

        return service;

        function CreateQuestion(queryData) {
            return common.$http.post(common.serviceBaseURL + 'questions', queryData);
        }

        function CreateFollowup(followupData) {
            return common.$http.post(common.serviceBaseURL + 'followups', followupData);
        }


        function GetQuestionsforExpert(expertId) {
            return common.$http.get(common.serviceBaseURL + 'questions/byexpert/' + expertId);
        }

        function GetQuestionsHistoryforExpert(expertId) {
            return common.$http.get(common.serviceBaseURL + 'questions/historybyexpert/' + expertId);
        }

        function GetFollowupsforExpert(expertId) {
            return common.$http.get(common.serviceBaseURL + 'followups/byexpert/' + expertId);
        }

        function GetQuestionsforUser(userId) {
            return common.$http.get(common.serviceBaseURL + 'questions/byuser/' + userId);
        }

        function GetFollowupsforUser(userId) {
            return common.$http.get(common.serviceBaseURL + 'followups/byuser/' + userId);
        }

        function GetQuestion(qid) {
            return common.$http.get(common.serviceBaseURL + 'questions/' + qid);
        }


        function GetFollowUpForQuestion(qid) {
            return common.$http.get(common.serviceBaseURL + 'followups/byquestion/' + qid);
        }

        function UpdateQuestion(qid, question) {
            return common.$http.put(common.serviceBaseURL + 'questions/' + qid, question);
        }

        function UpdateFollowup(fid, followup) {
            return common.$http.put(common.serviceBaseURL + 'followups/' + fid, followup);
        }

        function uploadFile(files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            return common.$http.post(common.serviceBaseURL + 'upload/PostFormData', fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        };
    }
})();