package com.example.presentation.restapi.todo;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.example.infrastructure.persistence.entity.TodoEntity;

import nablarch.common.dao.EntityList;
import nablarch.common.dao.UniversalDao;
import nablarch.core.repository.di.config.externalize.annotation.SystemRepositoryComponent;
import nablarch.fw.web.HttpRequest;
import nablarch.fw.web.HttpResponse;

@SystemRepositoryComponent
@Path("/files")
public class FileDownloadAction {
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public CreateResponse create() throws Exception {
        EntityList<TodoEntity> todoEntities = UniversalDao.findAll(TodoEntity.class);

        // サンプルのためCSV変換処理は簡易的に実装しているが、実案件ではライブラリの利用を検討すること。
        List<String> lines = todoEntities.stream()
            .map(entity -> String.join(",", entity.getTodoId().toString(), entity.getText()))
            .collect(Collectors.toList());
        
        String fileKey = generateFileKey();

        //java.nio.file.Pathとjavax.ws.rs.Pathで単純メイト重複するため、完全修飾名で指定している。
        java.nio.file.Path filePath = getCsvFilePath(fileKey);
        Files.createFile(filePath);
        Files.write(filePath, lines);
        return new CreateResponse(fileKey);
    }

    @Path("{fileKey: .+}")
    @GET
    public HttpResponse download(HttpRequest request) throws Exception {
        String fileKey = request.getParam("fileKey")[0];

        java.nio.file.Path filePath = getCsvFilePath(fileKey);
        byte[] fileData = Files.readAllBytes(filePath);

        HttpResponse response = new HttpResponse();
        response.setContentType("text/csv");
        response.write(fileData);
        return response;
    }

    private String generateFileKey() {
        return UUID.randomUUID().toString();
    }

    private java.nio.file.Path getCsvFilePath(String fileKey) {
        String outputDir = System.getProperty("java.io.tmpdir");
        String fileName = fileKey + ".csv";
        return Paths.get(outputDir, fileName);
    }

    public static class  CreateResponse {
        public String fileKey;
        public CreateResponse(String fileKey){
            this.fileKey = fileKey;
        }
    }
}
