![image](/images/code-smell-katas/codeSmell.jpg)

## Code smell Katas — Graceful exception handling
###### *Feb 28, 2021*

In computer programming, a **code smell** is any characteristic 
in the source code of a program that possibly indicates a deeper 
problem. Determining what is and is not a code smell is subjective, 
and varies by language, developer, and development methodology.
 — wikipedia
 
 Code smells are often symptoms of poor design or implementation choices.

![image](/images/code-smell-katas/clean-code-1.jpg)

Let’s take up a Code Smell [kata](https://en.wikipedia.org/wiki/Kata) in this blog post.

Consider a business scenario which has to make a HTTP 
call to a service to update a document if it exists or create 
new document if it doesn’t exist.

Below class has only one public method **`createOrupdateDocument`** and 
all other methods are private and have no visibility to other classes.


```java
public class CodeSmellHttpClient {

  public static final Logger LOG = LoggerFactory.getLogger(CodeSmellHttpClient.class);
  private final String baseUrl = "https://some.service.com/documents/";

  private HttpClient httpClient = HttpClients.createDefault();

  private String bearerToken = "some bearer token";

  public void createOrUpdateDocument(String requestBody, String documentId) {
    if (this.isDocumentExistingWithId(documentId)) {
      this.updateDocument(requestBody, documentId);
    } else {
      this.createDocument(requestBody);
    }
  }

  private void createDocument(String requestBody) {

    try {

      HttpPost httpPostRequest = new HttpPost(baseUrl);
      StringEntity requestEntity = new StringEntity(requestBody, ContentType.APPLICATION_JSON);

      httpPostRequest.setEntity(requestEntity);
      httpPostRequest.addHeader(getAuthorizationHeader());

      HttpResponse response = httpClient.execute(httpPostRequest);
      LOG.info(response.toString());
    } catch (IOException e) {
      LOG.error(e.getMessage());
      e.printStackTrace();
    }
  }

  private void updateDocument(String requestBody, String documentId) {
    final String updateDocumentUrl = baseUrl.concat(documentId);

    HttpPatch httpPatchRequest = new HttpPatch(updateDocumentUrl);
    StringEntity requestEntity = new StringEntity(requestBody, ContentType.APPLICATION_JSON);

    httpPatchRequest.setEntity(requestEntity);
    httpPatchRequest.setHeader(getAuthorizationHeader());
    try {
      HttpResponse response = httpClient.execute(httpPatchRequest);
      LOG.info(response.toString());
    } catch (IOException e) {
      LOG.error(e.getMessage());
      e.printStackTrace();
    }
  }

  private boolean isDocumentExistingWithId(String documentId) {
    final String getTemplateUrl = baseUrl.concat(documentId);

    HttpGet httpGetRequest = new HttpGet(getTemplateUrl);
    httpGetRequest.setHeader(getAuthorizationHeader());
    HttpResponse response = null;

    try {
      response = httpClient.execute(httpGetRequest);
      LOG.info(response.toString());
    } catch (IOException e) {
      LOG.error(e.getMessage());
      e.printStackTrace();
    }

    if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
      LOG.info(documentId + "already exists");
      return true;
    }

    LOG.info(documentId + "does not exists");
    return false;

  }

  private Header getAuthorizationHeader() {
    return new BasicHeader(HttpHeaders.AUTHORIZATION,
        "Bearer " + bearerToken);
  }

}
```
*Above code :* 
https://gist.github.com/akhil-ghatiki/98339ea96a6a39876aa3745f9cf185cb#file-codesmell1-java

Let’s deviate a bit from code smells for now and take a 
look at above class. Why should this class take care about 
creating HttpClient ? How can you test this class for unit testing ? 
What can you test for unit testing ?

Consider moving the creation of HttpClient into a different class 
and passing it to this class as constructor parameter like below 
or as an autowired bean if you are using Spring framework.

```java
private HttpClient httpClient;

public CodeSmellHttpClient(HttpClient httpClient, String bearerToken) {
  this.httpClient = httpClient;
  this.bearerToken = bearerToken;
}
```
This will help you in mocking the creation of HttpClient
and verifying the calls of **`httpClient.execute(httpGetRequest)`**, 
**`httpClient.execute(httpPostRequest)`**,**`httpClient.execute(httpPatchRequest)`**
respectively when get, post and patch requests are made 
through the private methods.

 > ProTip: If one is following test driven development, one will not end up into most of the code smells like in above implementation. Test driven development forces you to write cleaner code in many ways. All hail TDD !

Now, just look into **`isDocumentExistingWithId(String documentId)`** 
method in above code, take a minute and try listing out the code 
smells in it.

What happens if there is an exception ?

Everything works smooth in a happy scenario here. But 
in case of exception, the method catches the exception and 
logs it, and then the if statement after the catch is checking 
the status code in response. One is not very far away form seeing 
a huge red log lines of NullPointerException in the console when 
an exception occurs.

Alright, now lets make some changes to tackle the exception 
scenario where there is an exception in this method. How about 
changing the method to below ? — moving the if condition into 
the try block.

```java
private boolean isDocumentExistingWithId(String documentId) {  final String getTemplateUrl = baseUrl.concat(documentId);

  HttpGet httpGetRequest = new HttpGet(getTemplateUrl);
  httpGetRequest.setHeader(getAuthorizationHeader());
  HttpResponse response = null;

  try {
    response = httpClient.execute(httpGetRequest);
    LOG.info(response.toString());    if(response.getStatusLine().getStatusCode()==HttpStatus.SC_OK){
      LOG.info(documentId + "already exists");
      return true;
    }
  } catch (IOException e) {
    LOG.error(e.getMessage());
    e.printStackTrace();
  }
  LOG.info(documentId + "does not exists");
  return false;
}
```

This seems to mitigate the issue we were discussing a while ago.
But wait, did we look into the caller method of this method ? 
Have a look into **`createOrUpdateDocument(String requestBody, 
String documentId)`** in the code example. (Sorry for making 
you scroll the page so many times :p)

The **`createDocument(newRequest)`** gets executed because we are 
returning false when the exception is caught in the 
**`isDocumentExistingWithId(String documentId)`** and this 
is invoking the createDocument method. We don’t want 
that to happen.

Take a minute now and think how can this be handled ! 
Don’t scroll down to answer before giving it a thought.

.

.

.

.

.

.

.

.

If throwing the exception is resonating in the corridors of 
your brain, yes, you are right !

Throw the exception in **`isDocumentExistingWithId(String documentId)`** 
instead of handling it.Let the caller method decide what to do 
with that exception. This is what I call handling the exception 
gracefully. Treat the exception like first class citizens in 
your implementations. Don’t ignore them. Functional programming
 does amazing job in treating exceptions as first class citizens. 
 Will not discuss more about functional programming as that is 
 way beyond the scope of this blog post.

> ProTip: Treat exceptions like first class citizens in your implementations.

Below is the implementation of throwing the exception as discussed.

```java
public class CodeSmellHttpClient {

  public static final Logger LOG = LoggerFactory.getLogger(CodeSmellHttpClient.class);
  private final String baseUrl = "https://some.service.com/documents/";

  private HttpClient httpClient;

  private String bearerToken = "some bearer token";

  public CodeSmellHttpClient(HttpClient httpClient, String bearerToken) {
    this.httpClient = httpClient;
    this.bearerToken = bearerToken;
  }

  public void createOrUpdateDocument(String requestBody, String documentId) {
    boolean isDocumentExisting;
    try {
      isDocumentExisting = isDocumentExistingWithId(documentId);
    } catch (IOException e) {
      LOG.error("Unable to get template details", e);
      throw new RuntimeException("Unable to get template details", e);
    }
    if (isDocumentExisting) {
      this.updateDocument(requestBody, documentId);
    } else {
      this.createDocument(requestBody);
    }
  }

  private void createDocument(String requestBody) {

    try {

      HttpPost httpPostRequest = new HttpPost(baseUrl);
      StringEntity requestEntity = new StringEntity(requestBody, ContentType.APPLICATION_JSON);

      httpPostRequest.setEntity(requestEntity);
      httpPostRequest.addHeader(getAuthorizationHeader());

      HttpResponse response = httpClient.execute(httpPostRequest);
      LOG.info(response.toString());
    } catch (IOException e) {
      LOG.error(e.getMessage());
      e.printStackTrace();
    }
  }

  private void updateDocument(String requestBody, String documentId) {
    final String updateDocumentUrl = baseUrl.concat(documentId);

    HttpPatch httpPatchRequest = new HttpPatch(updateDocumentUrl);
    StringEntity requestEntity = new StringEntity(requestBody, ContentType.APPLICATION_JSON);

    httpPatchRequest.setEntity(requestEntity);
    httpPatchRequest.setHeader(getAuthorizationHeader());
    try {
      HttpResponse response = httpClient.execute(httpPatchRequest);
      LOG.info(response.toString());
    } catch (IOException e) {
      LOG.error(e.getMessage());
      e.printStackTrace();
    }
  }

  private boolean isDocumentExistingWithId(String documentId) throws IOException {
    final String getTemplateUrl = baseUrl.concat(documentId);

    HttpGet httpGetRequest = new HttpGet(getTemplateUrl);
    httpGetRequest.setHeader(getAuthorizationHeader());

    HttpResponse response = httpClient.execute(httpGetRequest);
    LOG.info(response.toString());

    if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
      LOG.info(documentId + "already exists");
      return true;
    }
    LOG.info(documentId + "does not exists");
    return false;
  }

  private Header getAuthorizationHeader() {
    return new BasicHeader(HttpHeaders.AUTHORIZATION,
        "Bearer " + bearerToken);
  }

}
```
**Above code :** https://gist.github.com/akhil-ghatiki/37594c5852e7293a2d97b2e0028aa6b3#file-codesmell2-java 

Treat the exceptions good and they will treat you better.

I have intentionally left few code smells unaddressed. Drop 
them in the comments if you figure out any.
