<script type="text/javascript">
    let instances = "{{ json_encode(config('instance.instances')) }}"
    window.apiBaseUrl = "{{ config('api.apiBaseUrl') }}";
    window.baseUrl = "{{ config('api.baseUrl') }}";
    window.automationMicroserviceUrl = "{{ config('api.automationMicroserviceUrl') }}";
    window.instances = JSON.parse(instances.replace(/(&quot\;)/g,"\""));
</script>