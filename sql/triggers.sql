DROP trigger IF EXISTS valid_teachers;
DELIMITER $$
create trigger valid_teachers
BEFORE insert  ON running_modules
FOR EACH ROW
BEGIN
    DECLARE role1 varchar(32); 
    DECLARE role2 varchar(32); 
    DECLARE message VARCHAR(255);
    
    select role from users
    where id = NEW.teacher1_id  into role1;
    select role from users
    where id = NEW.teacher2_id into role2;

    if NEW.teacher1_id is not NULL and role1 <> 'teacher' then
        SET message = 'Teacher 1 id does not have teacher role in the users table';
        SET lc_messages = message;
        SIGNAL SQLSTATE '45000';
    end if;
    
    if NEW.teacher2_id is not NULL and role2 <> 'teacher' then
        SET message = 'Teacher 2 id does not have teacher role in the users table';
        SET lc_messages = message;
        SIGNAL SQLSTATE '45000';
    end if;

    if NEW.teacher1_id = NEW.teacher2_id then
        SET message = 'Teacher 1 and Teacher 2 have same ids';
        SET lc_messages = message;
        SIGNAL SQLSTATE '45000';
    end if;
end $$
DELIMITER ;
