<%@include file="/include-internal.jsp" %>
<jsp:useBean id="bundleDevUrl" type="java.lang.String" scope="request"/>
<%--@elvariable id="teamcityPluginResourcesPath" type="java.lang.String"--%>

<c:set var="useDevBundle" value="true"/>
<%-- FIX: this mess --%>
<%-- <bs:linkScript>${useDevBundle ? bundleDevUrl : teamcityPluginResourcesPath}bundle.js</bs:linkScript> --%>
<script type="module" src="http://localhost:9091/bundle.js"></script>