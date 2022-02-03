package com.searchservice.api.service;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.searchservice.api.entity.SearchHistory;
import com.searchservice.api.repositories.SearchHistoryRepository;

@Component
@Service
public class SearchHistoryService {
	@Autowired
	SearchHistoryRepository shr;

	
	public List<SearchHistory> getSearches(String userId) {
		List<SearchHistory> results= shr.findAll();
		List<SearchHistory> sh =new ArrayList<SearchHistory>();
		for(SearchHistory s:results) {
			if(s.getUserId().equalsIgnoreCase(userId)) {
				sh.add(s);
			}
		}
	return sh;
	}
	
	public SearchHistory addSearchHistory(SearchHistory sh) {
		return shr.save(sh);
	}
	


}
