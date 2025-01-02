package com.example.todo;

import org.junit.Test;
import nablarch.fw.web.HttpResponse;
import nablarch.fw.web.RestMockHttpRequest;
import nablarch.test.core.http.SimpleRestTestSupport;
import static com.jayway.jsonpath.matchers.JsonPathMatchers.hasJsonPath;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;

public class RestApiTest extends SimpleRestTestSupport {
    @Test
    public void restApiTest(){
        RestMockHttpRequest request = get("/api/todos");
        HttpResponse response = sendRequest(request);

        assertStatusCode("ToDoi一覧の取得", HttpResponse.Status.OK, response);
        String responseBody = response.getBodyString();
        assertThat(responseBody, hasJsonPath("$", hasSize(3)));

        assertThat(responseBody, hasJsonPath("$[0].id", equalTo(1)));
        assertThat(responseBody, hasJsonPath("$[0].text", equalTo("やること1")));

        assertThat(responseBody, hasJsonPath("$[1].id", equalTo(2)));
        assertThat(responseBody, hasJsonPath("$[1].text", equalTo("やること2")));

        assertThat(responseBody, hasJsonPath("$[2].id", equalTo(3)));
        assertThat(responseBody, hasJsonPath("$[2].text", equalTo("やること3")));

    }
}
