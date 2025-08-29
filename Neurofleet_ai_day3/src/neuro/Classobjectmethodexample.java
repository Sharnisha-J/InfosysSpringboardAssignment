package neuro;
class Student {
    String name;
    int age;
    void displayDetails() {
        System.out.println("Name: "+name+"\nAge: "+age);
    }
}
public class Classobjectmethodexample {

	public static void main(String[] args) {
		Student s1=new Student();
        s1.name="Alice";
        s1.age=20;
        s1.displayDetails();
        Student s2=new Student();
        s2.name="Bob";
        s2.age=22;
        s2.displayDetails();
	}

}
