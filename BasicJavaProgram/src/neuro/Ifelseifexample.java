package neuro;
import java.util.*;
public class Ifelseifexample {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
        int marks=sc.nextInt();
        if(marks>=90) {
            System.out.println("Grade A");
        }
        else if(marks>=75) {
            System.out.println("Grade B");
        }
        else if(marks>=60){
            System.out.println("Grade C");
        }
        else if(marks>=45){
            System.out.println("Grade D");
        }
        else {
        	System.out.println("Fail");
        }
	}

}
