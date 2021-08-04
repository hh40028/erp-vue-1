<template>
    <div class="container">
        <div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" style="width: 900px">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></div>
                        <h4 class="modal-title">报表打印</h4>
                    </div>
                    <div id="pdf"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {}
    },
    created: function () {
    },
    methods: {
        load: function (data) {
            let reportPdfUrl = this.$root.basePath + 'common/getReportPdf?r=' + Math.random() + '&filename=' + data;
            $('#pdf').empty();
            $('#pdf').append("<object classid=\"clsid:CA8A9780-280D-11CF-A24D-444553540000\" width=\"900\" height=\"800\" border=\"0\">\n" +
                "                        <param name=\"_Version\" value=\"65539\">\n" +
                "                        <param name=\"_ExtentX\" value=\"20108\">\n" +
                "                        <param name=\"_ExtentY\" value=\"10866\">\n" +
                "                        <param name=\"_StockProps\" value=\"0\">\n" +
                "                        <param name=\"SRC\" value=\"pdf/test.pdf\">\n" +
                "                        <object data=\"" + reportPdfUrl + "\" type=\"application/pdf\" width=\"900\" height=\"800\">\n" +
                "                        </object>\n" +
                "                    </object>")
            $('#viewModal').modal('show');
        }
    }
}
</script>

<style scoped>

</style>
