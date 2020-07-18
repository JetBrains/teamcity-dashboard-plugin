<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/include.jsp" %>

<bs:page isExperimentalUI="true">
<jsp:attribute name="head_include">
    <script type="text/javascript">
        ReactUI.setIsExperimentalUI();
    </script>
</jsp:attribute>
<jsp:attribute name="body_include">
    <div id="app"></div>
    <%@ include file="bundle.jsp" %>
</jsp:attribute>
</bs:page>