package operator;
import java.util.*;
public class Unaryoperators {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		int b=sc.nextInt();
        System.out.println("++b: "+(++b)); 
        System.out.println("b++: "+(b++)); 
        System.out.println("After b++: "+b);
        System.out.println("--b: "+(--b)); 
        System.out.println("b--: "+(b--)); 
        System.out.println("After b--: "+b);
	}

}
