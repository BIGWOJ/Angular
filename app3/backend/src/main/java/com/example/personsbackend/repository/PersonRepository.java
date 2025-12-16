package com.example.personsbackend.repository;

import com.example.personsbackend.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "persons", path = "persons")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:53894"})
public interface PersonRepository extends JpaRepository<Person, Long> {
}
