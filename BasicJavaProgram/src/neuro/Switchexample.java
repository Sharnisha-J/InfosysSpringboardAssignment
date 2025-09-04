package neuro;
import java.util.*;
public class Switchexample {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
        char ch= sc.next().charAt(0);
        switch(ch) {
            case 'r':
            	System.out.println("Red");
            	break;
            case 'b':
            	System.out.println("Blue");
            	break;
            case 'g':
            	System.out.println("Green");
            	break;
            default:
            	System.out.println("Invalid character");
        }
	}

}
