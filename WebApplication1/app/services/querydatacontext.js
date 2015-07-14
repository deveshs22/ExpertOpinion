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
            GetQuestionsforUser:GetQuestionsforUser,
            GetFollowupsforExpert: GetFollowupsforExpert,
            GetFollowUpForQuestion:GetFollowUpForQuestion,
            GetQuestion: GetQuestion,
            UpdateQuestion: UpdateQuestion
        };

        return service;

        function CreateQuestion(queryData) {
            return common.$http.post(common.serviceBaseURL + 'questions', queryData);
        }

        function GetQuestionsforExpert(expertId) {
            return common.$http.get(common.serviceBaseURL + 'questions/byexpert/' + expertId);
        }

        function GetFollowupsforExpert(expertId) {
            return common.$http.get(common.serviceBaseURL + 'followups/byexpert/' + expertId);
        }

        function GetQuestionsforUser(userId) {
            return common.$http.get(common.serviceBaseURL + 'questions/byuser/' + userId);
        }

        function GetQuestion(qid)
        {
            return common.$http.get(common.serviceBaseURL + 'questions/' + qid);
        }


         function GetFollowUpForQuestion(qid) {
             return common.$http.get(common.serviceBaseURL + 'followups/byquestion/' + qid);
        }

        function UpdateQuestion(qid,question)
        {
            return common.$http.put(common.serviceBaseURL + 'questions/UpdateQuestion/' + qid, question);
        }

        function uploadFile(files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            return common.$http.post(common.serviceBaseURL + 'upload/PostFormData', fd, {
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            })
        };
    }
})();