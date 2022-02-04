package com.searchservice.api.controllers;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.searchservice.api.entity.SearchHistory;
import com.searchservice.api.service.SearchHistoryService;



@RestController
@RequestMapping("/search")
public class SearchHistoryController {
	@Autowired SearchHistoryService svc;
	
	@GetMapping
	public String hello() {
		return "Hello World";
	}
	
	@GetMapping("/checkifexists")
	public ResponseEntity<SearchHistory> checkIfSearchExists(@RequestParam(value="airport") String airport, @RequestParam(value="userId") String userId,@RequestParam(value="dateSearched")String dateSearched ) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-M-dd", Locale.ENGLISH);
	
		SearchHistory result=svc.checkIfExists(userId, airport, dateSearched);
		if(result==null){
			return new ResponseEntity<SearchHistory>(result,HttpStatus.NO_CONTENT);
		}
		else {
			return new ResponseEntity<SearchHistory>(result,HttpStatus.OK);
		}
	}
	
	
	
	@GetMapping("/getsearchhistory/{userId}")
	public List<SearchHistory> getSearches(@PathVariable(value="userId") String userId){
		return svc.getSearches(userId);
	}
	
	@PostMapping("/addsearchhistory")
	public ResponseEntity<String> addSearch(@RequestBody SearchHistory sh) {
		System.out.println(sh.getCreateDate());
		try {
		
		svc.addSearchHistory(sh);
		}
		catch(Exception e) {
			return new ResponseEntity<String>("Error Occured while updating Users Search History",HttpStatus.BAD_REQUEST);
		}
	return new ResponseEntity<String>("Added Successfully",HttpStatus.OK);	
	}
	
}
