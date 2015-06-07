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
            GetFollowupsforExpert: GetFollowupsforExpert
        };

        return service;

        function CreateQuestion(queryData) {
            return common.$http.post(common.serviceBaseURL + 'Question/PostQuestion', queryData);
        }

        function GetQuestionsforExpert(expertId) {
            return common.$http.get(common.serviceBaseURL + 'Question/GetQuestionsbyExpertId/'+ expertId);
        }

        function GetFollowupsforExpert(expertId) {
            return common.$http.get(common.serviceBaseURL + 'FollowUp/GetFollowUpsbyExpertId/'+ expertId);
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