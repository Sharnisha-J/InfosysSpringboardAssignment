package operator;
import java.util.*;
public class Assignmentoperators {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		int a=sc.nextInt();
		System.out.println("a+=5: "+(a+=5));
		System.out.println("a-=5: "+(a-=5));
		System.out.println("a*=5: "+(a*=5));
		System.out.println("a/=5: "+(a/=5));
		System.out.println("a%=5: "+(a%=5));
	}

}
